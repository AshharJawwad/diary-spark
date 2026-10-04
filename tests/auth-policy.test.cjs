const { test } = require("node:test");
const assert = require("node:assert/strict");

test("completed sign-in redirects instead of retaining either login form", async () => {
  const { loginView } = await import("../src/lib/auth-policy.mjs");
  assert.equal(loginView({ isLoaded: true, isSignedIn: true, useClerkFlow: true }), "redirect");
  assert.equal(loginView({ isLoaded: true, isSignedIn: true, useClerkFlow: false }), "redirect");
  assert.equal(loginView({ isLoaded: false, isSignedIn: false }), "loading");
  assert.equal(loginView({ isLoaded: true, isSignedIn: false }), "credentials");
  assert.equal(loginView({ isLoaded: true, isSignedIn: false, useClerkFlow: true }), "clerk");
  assert.equal(loginView({ isLoaded: true, isSignedIn: true, currentTask: { key: "choose-organization" } }), "clerk");
});

test("login cannot create or transfer an unknown account into registration", async () => {
  const { signInOptions } = await import("../src/lib/auth-policy.mjs");
  assert.equal(signInOptions.withSignUp, false);
  assert.equal(signInOptions.transferable, false);
  assert.equal(signInOptions.path, "/login");
  assert.equal(signInOptions.signUpUrl, "/register");
});
