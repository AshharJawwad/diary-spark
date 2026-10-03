const { test } = require("node:test");
const assert = require("node:assert/strict");

function request(email) {
  return new Request("http://localhost:3000/api/auth/lookup", {
    method: "POST", headers: { "Content-Type": "application/json", origin: "http://localhost:3000" },
    body: JSON.stringify({ email }),
  });
}
async function handler(users) {
  const { createAccountLookup } = await import("../src/lib/account-lookup.mjs");
  return createAccountLookup(async () => users);
}
test("registered email goes to login and prefills through a short-lived private cookie", async () => {
  const POST = await handler([{ emailAddresses: [{ emailAddress: "Alex@example.com" }] }]);
  const response = await POST(request(" alex@example.com "));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { destination: "/login" });
  assert.match(response.headers.get("set-cookie"), /HttpOnly/);
});
test("new email goes to registration, even when Clerk returns a partial match", async () => {
  const POST = await handler([{ emailAddresses: [{ emailAddress: "not-alex@example.com" }] }]);
  assert.deepEqual(await (await POST(request("alex@example.com"))).json(), { destination: "/register" });
});
test("invalid email is rejected before querying Clerk", async () => {
  const { createAccountLookup } = await import("../src/lib/account-lookup.mjs");
  let calls = 0;
  const POST = createAccountLookup(async () => { calls++; return []; });
  assert.equal((await POST(request("invalid"))).status, 400);
  assert.equal(calls, 0);
});
test("Clerk errors never route a registered user to registration", async () => {
  const { createAccountLookup } = await import("../src/lib/account-lookup.mjs");
  const POST = createAccountLookup(async () => { throw new Error("secret service details"); });
  const response = await POST(request("alex@example.com"));
  assert.equal(response.status, 503);
  assert.equal((await response.text()).includes("secret service details"), false);
});
test("cross-origin lookups are rejected", async () => {
  const POST = await handler([]);
  const input = request("alex@example.com");
  input.headers.set("origin", "https://other.example");
  assert.equal((await POST(input)).status, 403);
});
test("lookup throttling stops further Clerk requests until the minute resets", async () => {
  const { createAccountLookup } = await import("../src/lib/account-lookup.mjs");
  let time = 0, calls = 0;
  const POST = createAccountLookup(async () => { calls++; return []; }, { maxRequests: 1, now: () => time });
  assert.equal((await POST(request("alex@example.com"))).status, 200);
  assert.equal((await POST(request("alex@example.com"))).status, 429);
  assert.equal(calls, 1);
  time = 60000;
  assert.equal((await POST(request("alex@example.com"))).status, 200);
});
test("malformed prefill cookies cannot break authentication pages", async () => {
  const { emailFromCookie } = await import("../src/lib/account-lookup.mjs");
  assert.equal(emailFromCookie("%E0%A4%A"), "");
  assert.equal(emailFromCookie("alex%40example.com"), "alex@example.com");
});
