const { test } = require("node:test");
const assert = require("node:assert/strict");

test("registration hint survives a new tab, supports unregistered users, and handles blocked storage", async () => {
  const previousWindow = global.window;
  const storage = () => {
    const values = new Map();
    return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), clear: () => values.clear() };
  };
  global.window = { sessionStorage: storage(), localStorage: storage(), dispatchEvent: () => {} };
  try {
    const { getRegistrationStatus, getServerRegistrationStatus, rememberRegistration } = await import("../src/lib/browser-registration.mjs");
    assert.equal(getRegistrationStatus(), null);
    assert.equal(getServerRegistrationStatus(), null);
    rememberRegistration(true);
    global.window.sessionStorage = storage();
    assert.equal(getRegistrationStatus(), "registered");
    rememberRegistration(false);
    assert.equal(getRegistrationStatus(), "unregistered");
    global.window.localStorage.clear();
    global.window.sessionStorage.clear();
    assert.equal(getRegistrationStatus(), null);
    global.window.localStorage = { getItem: () => { throw new Error("Blocked"); }, setItem: () => { throw new Error("Blocked"); } };
    rememberRegistration(true);
    assert.equal(getRegistrationStatus(), "registered");
    global.window.sessionStorage = global.window.localStorage;
    assert.equal(getRegistrationStatus(), "registered");
  } finally { global.window = previousWindow; }
});
