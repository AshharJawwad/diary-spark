const { test } = require("node:test");
const assert = require("node:assert/strict");

test("login cannot create or transfer an unknown account into registration", async () => {
  const { signInOptions } = await import("../src/lib/auth-policy.mjs");
  assert.equal(signInOptions.withSignUp, false);
  assert.equal(signInOptions.transferable, false);
  assert.equal(signInOptions.path, "/login");
  assert.equal(signInOptions.signUpUrl, "/register");
});
