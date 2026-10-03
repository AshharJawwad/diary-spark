const MAX_BODY_BYTES = 8192;

async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError("Request too large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

export function createFeedbackHandler({ saveFeedback, notifyFeedback, updateNotification }) {
  return async function POST(request) {
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return Response.json({ error: "Use application/json." }, { status: 415 });
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
      return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
    }

    let body;
    try {
      body = JSON.parse(await readBody(request));
    } catch (error) {
      const status = error instanceof RangeError ? 413 : 400;
      return Response.json({ error: status === 413 ? "Request is too large." : "Invalid JSON body." }, { status });
    }
    if (!body || ["name", "email", "message"].some(key => typeof body[key] !== "string")) {
      return Response.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    const { name, email, message } = body;
    const feedback = { name: name.trim(), email: email.trim(), message: message.trim() };
    if (!feedback.name || name.length > 100 || !feedback.message || message.length > 500 ||
        email.length > 254 || /[\r\n]/.test(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedback.email)) {
      return Response.json({ error: "Enter a valid name (up to 100 characters), email, and message (up to 500 characters)." }, { status: 400 });
    }

    let saved;
    try {
      saved = await saveFeedback(feedback);
    } catch {
      return Response.json({ error: "Unable to save feedback. Please try again later." }, { status: 503 });
    }

    let notificationStatus = "sent";
    try {
      await notifyFeedback(feedback);
    } catch {
      notificationStatus = "failed";
    }
    try {
      await updateNotification(saved.id, notificationStatus);
    } catch {
      // The submission is already saved; a tracking failure must not invite duplicates.
      console.error("Unable to update feedback notification status.");
    }
    return Response.json({ message: "Feedback saved.", notificationStatus }, { status: 201 });
  };
}
