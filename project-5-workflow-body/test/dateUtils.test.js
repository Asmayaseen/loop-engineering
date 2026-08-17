const test = require("node:test");
const assert = require("node:assert");
const { daysBetween } = require("../src/dateUtils.js");

test("daysBetween same date returns 0", () => {
  assert.strictEqual(daysBetween(new Date("2024-01-01"), new Date("2024-01-01")), 0);
});

test("daysBetween one day apart returns 1", () => {
  assert.strictEqual(daysBetween(new Date("2024-03-01"), new Date("2024-03-02")), 1);
});

test("daysBetween nine days apart returns 9", () => {
  assert.strictEqual(daysBetween(new Date("2024-01-01"), new Date("2024-01-10")), 9);
});
