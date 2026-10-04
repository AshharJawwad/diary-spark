const { test } = require("node:test");
const assert = require("node:assert/strict");

test("mobile device verification uses Clerk's second-factor email API and completes login", async () => {
  const { loginVerification, sendLoginCode, verifyLoginCode } = await import("../src/lib/login.mjs");
  const calls = [];
  const signIn = {
    status: "needs_client_trust",
    supportedSecondFactors: [{ strategy: "email_code", safeIdentifier: "a***@example.com" }],
    mfa: {
      sendEmailCode: async () => { calls.push("send"); return { error: null }; },
      verifyEmailCode: async params => { calls.push(params); signIn.status = "complete"; return { error: null }; },
    },
  };
  const factor = loginVerification(signIn);
  assert.equal(factor.strategy, "email_code");
  await sendLoginCode(signIn, factor);
  await verifyLoginCode(signIn, factor, " 123456 ");
  assert.equal(signIn.status, "complete");
  assert.deepEqual(calls, ["send", { code: "123456" }]);
});

test("failed, empty, and incomplete verification cannot complete login", async () => {
  const { verifyLoginCode, sendLoginCode } = await import("../src/lib/login.mjs");
  const factor = { strategy: "email_code" };
  await assert.rejects(verifyLoginCode({}, factor, " "), /Enter your verification code/);
  await assert.rejects(verifyLoginCode({ mfa: { verifyEmailCode: async () => ({ error: new Error("Invalid code") }) } }, factor, "123456"), /Invalid code/);
  await assert.rejects(verifyLoginCode({ status: "needs_client_trust", mfa: { verifyEmailCode: async () => ({ error: null }) } }, factor, "123456"), /not complete/);
  await assert.rejects(sendLoginCode({ mfa: { sendEmailCode: async () => ({ error: new Error("Try again later") }) } }, factor), /Try again later/);
});

test("SMS and authenticator verification use the correct Clerk methods", async () => {
  const { loginVerification, sendLoginCode, verifyLoginCode } = await import("../src/lib/login.mjs");
  for (const strategy of ["phone_code", "totp"]) {
    const signIn = { status: "needs_second_factor", supportedSecondFactors: [{ strategy }], mfa: {} };
    const calls = [];
    signIn.mfa.sendPhoneCode = async (...args) => { calls.push(args); return { error: null }; };
    const verify = async params => { calls.push(params); signIn.status = "complete"; return { error: null }; };
    signIn.mfa.verifyPhoneCode = verify;
    signIn.mfa.verifyTOTP = verify;
    const factor = loginVerification(signIn);
    await sendLoginCode(signIn, factor);
    await verifyLoginCode(signIn, factor, "123456");
    assert.deepEqual(calls, strategy === "phone_code" ? [[], { code: "123456" }] : [{ code: "123456" }]);
  }
  assert.equal(loginVerification({ status: "complete" }), null);
  assert.equal(loginVerification({ status: "needs_second_factor", supportedSecondFactors: [{ strategy: "backup_code" }] }), null);
});

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
