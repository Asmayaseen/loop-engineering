const test = require("node:test");
const assert = require("node:assert");
const { reverseString } = require("../src/stringUtils.js");

test("reverseString('hello') returns 'olleh'", () => {
  assert.strictEqual(reverseString("hello"), "olleh");
});

test("reverseString('a') returns 'a'", () => {
  assert.strictEqual(reverseString("a"), "a");
});

test("reverseString('abcd') returns 'dcba'", () => {
  assert.strictEqual(reverseString("abcd"), "dcba");
});
