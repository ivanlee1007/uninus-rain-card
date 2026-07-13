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

test("force portrait is wired from the editor through live card layout updates", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /_switch\("force_portrait",\s*"強制使用直式版面"\)/);
  assert.match(source, /getLayoutMode\(width,\s*height,\s*this\._config\?\.force_portrait\)/);
  assert.match(source, /setConfig\(config\)[\s\S]*?getBoundingClientRect\(\)[\s\S]*?_updateLayout/);
  assert.match(source, /short-portrait/);
});

test("short portrait uses a dense vertical hierarchy for near-square cards", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /ha-card\.portrait\.short-portrait \.content\s*\{[\s\S]*?min-height:\s*0[\s\S]*?gap:\s*3px/);
  assert.match(source, /ha-card\.portrait\.short-portrait \.icon-wrap\s*\{[\s\S]*?width:\s*30px/);
  assert.match(source, /ha-card\.portrait\.short-portrait \.heading-row\s*\{[\s\S]*?flex-direction:\s*row/);
  assert.match(source, /ha-card\.portrait\.short-portrait \.status\s*\{[\s\S]*?min-height:\s*18px/);
});

test("editor offers entity timestamps as secondary information sources", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /resolveSecondaryText\(\s*entity,\s*this\._config,/);
  assert.match(source, /<option value="last_changed"[\s\S]*?上次變更時間/);
  assert.match(source, /<option value="last_updated"[\s\S]*?最後更新時間/);
});

test("forced portrait handles ultra-short cards and exposes secondary metadata accessibly", async () => {
  const source = await readFile(sourcePath, "utf8");

  assert.match(source, /formatEntityTimestamp\(value,\s*this\.hass\?\.config\?\.time_zone\)/);
  assert.match(source, /ultra-short-portrait/);
  assert.match(source, /ha-card\.portrait\.ultra-short-portrait \.content\s*\{[\s\S]*?grid-template-rows:\s*18px auto 10px/);
  assert.match(source, /ha-card\.portrait\.ultra-short-portrait \.secondary[\s\S]*?display:\s*none/);
  assert.match(source, /const ariaLabel[\s\S]*?secondary[\s\S]*?visual\.statusText/);
});
