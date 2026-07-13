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
