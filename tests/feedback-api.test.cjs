const { test } = require("node:test");
const assert = require("node:assert/strict");

const valid = { name: "Alex", email: "alex@example.com", message: "Great site!" };
function request(body = valid) {
  return new Request("http://localhost:3000/api", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
async function setup(overrides = {}) {
  const { createFeedbackHandler } = await import("../src/lib/feedback/handler.mjs");
  const saved = [], notified = [], statuses = [];
  const POST = createFeedbackHandler({
    saveFeedback: async data => { saved.push(data); return { id: "feedback-id" }; },
    notifyFeedback: async data => { notified.push(data); },
    updateNotification: async (id, status) => { statuses.push({ id, status }); },
    ...overrides,
  });
  return { POST, saved, notified, statuses };
}
test("saves validated feedback and sends notification", async () => {
  const { POST, saved, notified, statuses } = await setup();
  const response = await POST(request({ ...valid, name: " Alex ", notificationStatus: "sent" }));
  assert.equal(response.status, 201);
  assert.deepEqual(saved, [valid]);
  assert.deepEqual(notified, [valid]);
  assert.deepEqual(statuses, [{ id: "feedback-id", status: "sent" }]);
});
test("rejects malformed JSON without storing or sending", async () => {
  const { POST, saved, notified } = await setup();
  assert.equal((await POST(request("{"))).status, 400);
  assert.equal(saved.length + notified.length, 0);
});
test("rejects invalid fields and messages beyond 500 characters", async () => {
  const { POST, saved } = await setup();
  for (const body of [null, { ...valid, email: "invalid" }, { ...valid, name: " " },
    { ...valid, message: "x".repeat(501) }, { ...valid, email: "a@example.com\r\nBcc: x@y.com" }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal(saved.length, 0);
});
test("rejects oversized request bodies", async () => {
  const { POST } = await setup();
  assert.equal((await POST(request("x".repeat(8193)))).status, 413);
});
test("rejects cross-origin submissions and non-JSON requests", async () => {
  const { POST, saved } = await setup();
  const foreign = request();
  foreign.headers.set("origin", "https://other.example");
  assert.equal((await POST(foreign)).status, 403);
  const nonJson = request();
  nonJson.headers.set("content-type", "text/plain");
  assert.equal((await POST(nonJson)).status, 415);
  assert.equal(saved.length, 0);
});
test("database failure never sends email or reports success", async () => {
  const { POST, notified } = await setup({ saveFeedback: async () => { throw new Error("private database details"); } });
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.equal(notified.length, 0);
  assert.equal((await response.text()).includes("private database details"), false);
});
test("email failure preserves saved feedback and records failure", async () => {
  const { POST, saved, statuses } = await setup({ notifyFeedback: async () => { throw new Error("SMTP unavailable"); } });
  assert.equal((await POST(request())).status, 201);
  assert.equal(saved.length, 1);
  assert.deepEqual(statuses, [{ id: "feedback-id", status: "failed" }]);
});
