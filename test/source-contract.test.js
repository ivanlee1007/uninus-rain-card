import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const sourcePath = new URL("../src/uninus-rain-card.js", import.meta.url);

test("responsive observer is restarted whenever the card reconnects", async () => {
  const source = await readFile(sourcePath, "utf8");
  assert.match(source, /connectedCallback\(\)[\s\S]*?_ensureResizeObserver\(\)/);
  assert.match(source, /_ensureResizeObserver\(\)[\s\S]*?\.observe\(this\)/);
  assert.match(source, /disconnectedCallback\(\)[\s\S]*?\.disconnect\(\)/);
});

test("release artifact does not reference an unpublished source map", async () => {
  const config = await readFile(new URL("../rollup.config.js", import.meta.url), "utf8");
  assert.match(config, /sourcemap:\s*false/);
});

test("editor renders every state text setting without optional HA textfield dependencies", async () => {
  const source = await readFile(sourcePath, "utf8");
  const expectedFields = [
    "rain_state",
    "dry_state",
    "rain_text",
    "dry_text",
    "unavailable_text",
    "unknown_text",
    "rain_status_text",
    "dry_status_text",
    "unavailable_status_text",
    "unknown_status_text",
    "rain_icon",
    "dry_icon",
    "unavailable_icon",
  ];

  assert.doesNotMatch(source, /<ha-textfield/);
  assert.match(source, /<input[\s\S]*?type="text"[\s\S]*?data-key=\$\{key\}/);
  assert.match(source, /this\._config\?\.\[key\]\s*\?\?\s*DEFAULT_CONFIG\[key\]\s*\?\?\s*""/);
  for (const key of expectedFields) {
    assert.match(source, new RegExp(`_textField\\("${key}"`));
  }
});

test("portrait cards stack icon, copy, and status instead of using the tiny row", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /ha-card\.portrait \.content\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(source, /ha-card\.portrait \.heading-row\s*\{[\s\S]*?flex-direction:\s*column/);
  assert.match(source, /ha-card\.portrait \.state-text\s*\{[\s\S]*?white-space:\s*normal/);
  assert.match(source, /ha-card\.portrait \.status\s*\{[\s\S]*?min-width:\s*0[\s\S]*?max-width:\s*100%/);
  assert.match(source, /ha-card\.portrait \.status-label\s*\{[\s\S]*?text-overflow:\s*ellipsis/);
});
