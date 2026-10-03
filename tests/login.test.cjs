const { test } = require("node:test");
const assert = require("node:assert/strict");

test("email and username logins use strict existing-account authentication", async () => {
  const { beginPasswordLogin } = await import("../src/lib/login.mjs");
  for (const identifier of ["alex@example.com", "alexm"]) {
    const calls = [];
    const signIn = {
      status: "complete",
      create: async params => {
        // Clerk rejects an explicit false transfer value; normal logins omit it.
        if (Object.hasOwn(params, "transfer") && params.transfer !== true) {
          return { error: new Error("false does not match one of the allowed values for parameter transfer") };
        }
        calls.push(["create", params]);
        return { error: null };
      },
      password: async params => { calls.push(["password", params]); return { error: null }; },
    };
    assert.equal(await beginPasswordLogin(signIn, { identifier: ` ${identifier} `, password: " password " }), "complete");
    assert.deepEqual(calls, [
      ["create", { identifier, signUpIfMissing: false }],
      ["password", { password: " password " }],
    ]);
  }
});
test("unknown accounts stop before password submission", async () => {
  const { beginPasswordLogin } = await import("../src/lib/login.mjs");
  let submitted = false;
  await assert.rejects(beginPasswordLogin({
    create: async () => ({ error: new Error("No account found") }),
    password: async () => { submitted = true; },
  }, { identifier: "unknown@example.com", password: "password" }), /No account found/);
  assert.equal(submitted, false);
});
test("missing credentials are rejected before contacting Clerk", async () => {
  const { beginPasswordLogin } = await import("../src/lib/login.mjs");
  for (const values of [{ identifier: "", password: "password" }, { identifier: "alexm", password: "" }]) {
    await assert.rejects(beginPasswordLogin({}, values), /required/);
  }
});
test("incorrect passwords fail and verification requirements are preserved", async () => {
  const { beginPasswordLogin } = await import("../src/lib/login.mjs");
  await assert.rejects(beginPasswordLogin({
    create: async () => ({ error: null }),
    password: async () => ({ error: new Error("Incorrect password") }),
  }, { identifier: "alexm", password: "wrong" }), /Incorrect password/);
  assert.equal(await beginPasswordLogin({
    status: "needs_client_trust",
    create: async () => ({ error: null }), password: async () => ({ error: null }),
  }, { identifier: "alexm", password: "password" }), "needs_client_trust");
});
