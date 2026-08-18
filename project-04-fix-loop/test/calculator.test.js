const test = require("node:test");
const assert = require("node:assert");
const { calculateDiscount } = require("../src/calculator.js");

test("calculateDiscount(100, 10) returns 90", () => {
  assert.strictEqual(calculateDiscount(100, 10), 90);
});

test("calculateDiscount(200, 50) returns 100", () => {
  assert.strictEqual(calculateDiscount(200, 50), 100);
});

test("calculateDiscount(50, 0) returns 50", () => {
  assert.strictEqual(calculateDiscount(50, 0), 50);
});
