const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

// Exercise the component's actual submission handler without a JSX test runner.
const source = readFileSync(resolve(__dirname, "../src/components/ui/InfoBtn.jsx"), "utf8");
const handler = source.slice(source.indexOf("  const handleSubmit ="), source.indexOf("  const closeSubmitted ="));

function setup(fetch) {
  const original = { name: "Alex", email: "alex@example.com", message: "Great site!" };
  const state = { submitted: false, submitting: false, error: null, formData: original };
  const createHandler = new Function("fetch", "formData", "setSubmitting", "setSubmitted", "setFormData", "setError", "feedbackEndpoint", "submitting", "setTimeout", `${handler}\nreturn handleSubmit;`);
  const submit = createHandler(fetch, original,
    value => { state.submitting = value; },
    value => { state.submitted = value; },
    value => { state.formData = value; },
    value => { state.error = value; },
    "/api", false, callback => callback());
  return { state, original, submit: () => submit({ preventDefault() {} }) };
}

test("successful feedback posts the payload and clears the form", async () => {
  let request;
  const { state, original, submit } = setup(async (url, options) => {
    request = { url, options };
    return { ok: true };
  });
  await submit();
  assert.equal(request.url, "/api");
  assert.equal(request.options.method, "POST");
  assert.deepEqual(JSON.parse(request.options.body), original);
  assert.equal(state.submitted, true);
  assert.equal(state.submitting, false);
  assert.deepEqual(state.formData, { name: "", email: "", message: "" });
});

for (const [name, fetch] of [
  ["HTTP error", async () => ({ ok: false, status: 500, json: async () => ({ error: "Unable to save feedback." }) })],
  ["network rejection", async () => { throw new Error("Network unavailable"); }],
]) {
  test(`${name} preserves inputs, reports an error, and allows retry`, async () => {
    const { state, original, submit } = setup(fetch);
    await submit();
    assert.equal(state.submitted, false);
    assert.deepEqual(state.formData, original);
    assert.equal(state.submitting, false);
    assert.ok(state.error);
  });
}
