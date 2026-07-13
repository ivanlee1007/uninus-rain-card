import test from "node:test";
import assert from "node:assert/strict";

import {
  applyEditorChange,
  DEFAULT_CONFIG,
  formatEntityTimestamp,
  getLayoutMode,
  normalizeConfig,
  resolveEditorValue,
  resolveSecondaryText,
  resolveVisualState,
} from "../src/core.js";

test("normalizeConfig requires an entity", () => {
  assert.throws(() => normalizeConfig({}), /entity/);
});

test("normalizeConfig supplies polished defaults and preserves valid custom settings", () => {
  const config = normalizeConfig({
    entity: "sensor.garden_rain",
    name: "溫室降雨",
    rain_state: "wet",
    dry_state: "dry",
    secondary_text: "西側感測器",
    secondary_attribute: "station",
    rain_color: "#dc2626",
    dry_color: "rgb(8, 145, 178)",
    animation: false,
    force_portrait: true,
  });

  assert.equal(config.entity, "sensor.garden_rain");
  assert.equal(config.name, "溫室降雨");
  assert.equal(config.rain_state, "wet");
  assert.equal(config.dry_state, "dry");
  assert.equal(config.secondary_text, "西側感測器");
  assert.equal(config.secondary_attribute, "station");
  assert.equal(config.rain_color, "#dc2626");
  assert.equal(config.dry_color, "rgb(8, 145, 178)");
  assert.equal(config.animation, false);
  assert.equal(config.force_portrait, true);
  assert.equal(config.rain_status_text, DEFAULT_CONFIG.rain_status_text);
  assert.equal(normalizeConfig({ entity: "sensor.rain", force_portrait: "true" }).force_portrait, false);
});

test("normalizeConfig rejects unsafe CSS color values", () => {
  const config = normalizeConfig({
    entity: "sensor.rain",
    rain_color: "url(javascript:alert(1))",
    dry_color: "not-a-color; display:none",
  });

  assert.equal(config.rain_color, DEFAULT_CONFIG.rain_color);
  assert.equal(config.dry_color, DEFAULT_CONFIG.dry_color);
});

test("resolveVisualState distinguishes rain, dry, unavailable, and unexpected states", () => {
  const config = normalizeConfig({
    entity: "sensor.rain",
    unknown_text: "感測器狀態異常",
  });

  assert.equal(resolveVisualState("下雨中", config).kind, "rain");
  assert.equal(resolveVisualState("沒下雨", config).kind, "dry");
  assert.equal(resolveVisualState("unavailable", config).kind, "unavailable");
  assert.equal(resolveVisualState("unknown", config).kind, "unavailable");
  assert.equal(resolveVisualState("校正中", config).kind, "unknown");
  assert.equal(resolveVisualState("校正中", config).stateText, "感測器狀態異常");
});

test("resolveSecondaryText prefers a configured entity attribute and preserves zero", () => {
  const config = normalizeConfig({
    entity: "sensor.rain",
    secondary_text: "屋頂感測器",
    secondary_attribute: "rain_rate",
  });

  assert.equal(resolveSecondaryText({ rain_rate: 0 }, config), "0");
  assert.equal(resolveSecondaryText({}, config), "屋頂感測器");
});

test("resolveSecondaryText exposes entity last changed and last updated timestamps", () => {
  const entity = {
    attributes: { station: "屋頂" },
    last_changed: "2026-07-14T01:20:00+08:00",
    last_updated: "2026-07-14T01:25:00+08:00",
  };
  const formatter = (value) => `FMT:${value}`;

  const changedConfig = normalizeConfig({ entity: "sensor.rain", secondary_attribute: "last_changed" });
  assert.equal(
    resolveSecondaryText(entity, changedConfig, formatter),
    "上次變更 FMT:2026-07-14T01:20:00+08:00",
  );

  const updatedConfig = normalizeConfig({ entity: "sensor.rain", secondary_attribute: "last_updated" });
  assert.equal(
    resolveSecondaryText(entity, updatedConfig, formatter),
    "最後更新 FMT:2026-07-14T01:25:00+08:00",
  );
});

test("entity timestamps use a 00-23 clock and invalid values fall back safely", () => {
  const midnight = formatEntityTimestamp("2026-07-14T00:05:00");
  assert.match(midnight, /00:05$/);
  assert.doesNotMatch(midnight, /24:05$/);

  const config = normalizeConfig({
    entity: "sensor.rain",
    secondary_text: "時間無法取得",
    secondary_attribute: "last_updated",
  });
  assert.equal(
    resolveSecondaryText({ attributes: { last_updated: "attribute collision" }, last_updated: "not-a-date" }, config),
    "時間無法取得",
  );

  const changedConfig = normalizeConfig({
    entity: "sensor.rain",
    secondary_text: "沒有變更時間",
    secondary_attribute: "last_changed",
  });
  assert.equal(
    resolveSecondaryText({ attributes: { last_changed: "attribute collision" } }, changedConfig),
    "沒有變更時間",
  );
});

test("applyEditorChange preserves booleans and removes cleared optional values", () => {
  const initial = { entity: "sensor.rain", show_status: true, secondary_attribute: "rate" };
  assert.deepEqual(applyEditorChange(initial, "show_status", false), {
    entity: "sensor.rain",
    show_status: false,
    secondary_attribute: "rate",
  });
  assert.deepEqual(applyEditorChange(initial, "secondary_attribute", ""), {
    entity: "sensor.rain",
    show_status: true,
  });
});

test("resolveEditorValue distinguishes switches from color inputs that expose checked", () => {
  const colorInput = {
    dataset: { valueType: "color" },
    checked: false,
    value: "#dc2626",
  };
  const switchInput = {
    dataset: { valueType: "boolean" },
    checked: false,
    value: "on",
  };

  assert.equal(resolveEditorValue(colorInput), "#dc2626");
  assert.equal(resolveEditorValue(switchInput), false);
  assert.equal(resolveEditorValue({ dataset: {}, value: "名稱" }, { value: "細節值" }), "細節值");
});

test("getLayoutMode adapts to actual card width and height", () => {
  assert.equal(getLayoutMode(150, 117, true), "portrait");
  assert.equal(getLayoutMode(320, 200, true), "portrait");
  assert.equal(getLayoutMode(210, 64), "tiny");
  assert.equal(getLayoutMode(150, 119), "tiny");
  assert.equal(getLayoutMode(150, 172), "tiny");
  assert.equal(getLayoutMode(150, 173), "portrait");
  assert.equal(getLayoutMode(150, 250), "portrait");
  assert.equal(getLayoutMode(320, 420), "portrait");
  assert.equal(getLayoutMode(359, 413), "portrait");
  assert.equal(getLayoutMode(360, 500), "expanded");
  assert.equal(getLayoutMode(320, 64), "compact");
  assert.equal(getLayoutMode(420, 80), "regular");
  assert.equal(getLayoutMode(520, 150), "expanded");
});
