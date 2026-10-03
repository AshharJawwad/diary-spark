const { test } = require("node:test");
const assert = require("node:assert/strict");
const valid = { name: "Alex Morgan", username: "alexm", email: "alex@example.com", password: "A long password 123!", confirmPassword: "A long password 123!" };
test("registration submits name, username, email, and password to Clerk without confirmation", async () => {
  const { registrationParams } = await import("../src/lib/registration.mjs");
  assert.deepEqual(registrationParams(valid), {
    firstName: "Alex", lastName: "Morgan", username: "alexm", emailAddress: "alex@example.com", password: valid.password,
  });
});
test("mismatched passwords cannot start registration", async () => {
  const { registrationParams } = await import("../src/lib/registration.mjs");
  assert.throws(() => registrationParams({ ...valid, confirmPassword: "different" }), /match/);
});
test("registration requires all five fields and preserves password whitespace", async () => {
  const { registrationParams } = await import("../src/lib/registration.mjs");
  for (const key of Object.keys(valid)) {
    assert.throws(() => registrationParams({ ...valid, [key]: "" }));
  }
  const password = "  A long password 123!  ";
  assert.equal(registrationParams({ ...valid, password, confirmPassword: password }).password, password);
});
test("verification begins only after Clerk successfully sends a code", async () => {
  const { startRegistration } = await import("../src/lib/registration.mjs");
  let sent = false;
  const signUp = {
    status: "missing_requirements", missingFields: [], unverifiedFields: ["email_address"],
    password: async () => ({ error: null }),
    verifications: { sendEmailCode: async () => { sent = true; return { error: null }; } },
  };
  assert.equal(await startRegistration(signUp, valid), "verification");
  assert.equal(sent, true);
  signUp.verifications.sendEmailCode = async () => ({ error: new Error("Unable to send code") });
  await assert.rejects(startRegistration(signUp, valid), /Unable to send code/);
});
test("missing account requirements do not strand users on email verification", async () => {
  const { startRegistration } = await import("../src/lib/registration.mjs");
  let sent = false;
  await assert.rejects(startRegistration({
    status: "missing_requirements", missingFields: ["phone_number"], unverifiedFields: ["email_address"],
    password: async () => ({ error: null }),
    verifications: { sendEmailCode: async () => { sent = true; } },
  }, valid), /Additional account details/);
  assert.equal(sent, false);
});
test("completed registration skips sending another verification code", async () => {
  const { startRegistration } = await import("../src/lib/registration.mjs");
  assert.equal(await startRegistration({ status: "complete", password: async () => ({ error: null }) }, valid), "complete");
});
