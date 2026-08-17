#!/usr/bin/env node
// Usage: node long-task.js <steps> <msPerStep>
const fs = require("fs");
const path = require("path");

const [, , stepsArg, intervalArg] = process.argv;
const steps = parseInt(stepsArg, 10);
const intervalMs = parseInt(intervalArg, 10);

if (!Number.isInteger(steps) || steps <= 0 || !Number.isInteger(intervalMs) || intervalMs < 0) {
  console.error("Usage: node long-task.js <steps> <msPerStep>");
  process.exit(1);
}

const outputDir = path.join(__dirname, "output");
const progressLog = path.join(outputDir, "progress.log");
const resultFile = path.join(outputDir, "result.json");

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(progressLog, "");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  for (let step = 1; step <= steps; step++) {
    await sleep(intervalMs);
    const line = `${new Date().toISOString()} step ${step}/${steps}\n`;
    fs.appendFileSync(progressLog, line);
  }

  const result = {
    status: "success",
    steps,
    intervalMs,
    completedAt: new Date().toISOString(),
  };
  fs.writeFileSync(resultFile, JSON.stringify(result, null, 2));
}

run();
