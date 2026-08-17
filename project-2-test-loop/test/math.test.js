const test = require("node:test");
const assert = require("node:assert");
const { add, isEven } = require("../src/math.js");

test("add(2, 3) returns 5", () => {
  assert.strictEqual(add(2, 3), 5);
});

test("add(10, -4) returns 6", () => {
  assert.strictEqual(add(10, -4), 6);
});

test("isEven(4) returns true", () => {
  assert.strictEqual(isEven(4), true);
});
