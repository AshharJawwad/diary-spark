export function validAccountEmail(value) {
  if (typeof value !== "string" || value.length > 254) return "";
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

export function emailFromCookie(value) {
  try { return validAccountEmail(decodeURIComponent(value || "")); }
  catch { return ""; }
}

export function createAccountLookup(findUsers, { maxRequests = 120, now = Date.now } = {}) {
  let windowStart = now();
  let requests = 0;
  return async function POST(request) {
    const headers = { "Cache-Control": "no-store" };
    const reply = (data, status) => Response.json(data, { status, headers });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return reply({ error: "Request not allowed." }, 403);
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
      return reply({ error: "Use application/json." }, 415);
    }
    if (now() - windowStart >= 60000) { windowStart = now(); requests = 0; }
    if (++requests > maxRequests) return reply({ error: "Too many requests. Please try again shortly." }, 429);

    let input;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply({ error: "Enter your email address." }, 400);
      let text = "", size = 0;
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          size += value.byteLength;
          if (size > 1024) { await reader.cancel(); return reply({ error: "Request too large." }, 413); }
          text += decoder.decode(value, { stream: true });
        }
        text += decoder.decode();
      } finally { reader.releaseLock(); }
      input = JSON.parse(text);
    } catch { return reply({ error: "Invalid request." }, 400); }
    const email = validAccountEmail(input?.email);
    if (!email) return reply({ error: "Enter a valid email address." }, 400);

    try {
      const users = await findUsers(email);
      const registered = users.some(user => user.emailAddresses.some(address => address.emailAddress.toLowerCase() === email));
      const response = reply({ destination: registered ? "/login" : "/register" }, 200);
      // Prefill the next page without putting an email address in the URL.
      response.headers.set("Set-Cookie", `diaryspark_auth_email=${encodeURIComponent(email)}; Path=/; Max-Age=300; HttpOnly; SameSite=Lax${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
      return response;
    } catch { return reply({ error: "Unable to check your account. Please try again later." }, 503); }
  };
}
