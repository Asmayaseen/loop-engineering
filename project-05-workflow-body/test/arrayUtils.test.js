const test = require("node:test");
const assert = require("node:assert");
const { findMax } = require("../src/arrayUtils.js");

test("findMax([1, 5, 3]) returns 5", () => {
  assert.strictEqual(findMax([1, 5, 3]), 5);
});

test("findMax([-10, -2, -30]) returns -2", () => {
  assert.strictEqual(findMax([-10, -2, -30]), -2);
});

test("findMax([7]) returns 7", () => {
  assert.strictEqual(findMax([7]), 7);
});
