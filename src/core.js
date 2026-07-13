const SAFE_COLOR = /^(?:#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([0-9.,%\s-]+\)|[a-z]+)$/i;

export const DEFAULT_CONFIG = Object.freeze({
  name: "降雨監測",
  secondary_text: "即時天氣狀態",
  secondary_attribute: "",
  rain_state: "下雨中",
  dry_state: "沒下雨",
  rain_text: "偵測到降雨",
  dry_text: "目前沒有降雨",
  unavailable_text: "感測器無法使用",
  unknown_text: "感測器狀態異常",
  rain_status_text: "請注意",
  dry_status_text: "正常",
  unavailable_status_text: "無資料",
  unknown_status_text: "檢查狀態",
  rain_icon: "mdi:weather-pouring",
  dry_icon: "mdi:weather-partly-cloudy",
  unavailable_icon: "mdi:cloud-question",
  rain_color: "#7f1d1d",
  rain_color_end: "#ea580c",
  rain_accent_color: "#fca5a5",
  dry_color: "#064e59",
  dry_color_end: "#0d9488",
  dry_accent_color: "#67e8f9",
  unknown_color: "#334155",
  unknown_color_end: "#475569",
  text_color: "#ffffff",
  animation: true,
  show_status: true,
  show_secondary: true,
});

function safeColor(value, fallback) {
  if (typeof value !== "string") return fallback;
  const candidate = value.trim();
  if (!candidate || candidate.length > 80 || !SAFE_COLOR.test(candidate)) return fallback;
  return candidate;
}

function text(value, fallback) {
  return typeof value === "string" ? value.trim() || fallback : fallback;
}

export function normalizeConfig(input) {
  if (!input || typeof input.entity !== "string" || !input.entity.trim()) {
    throw new Error("Uninus Rain Card requires an entity");
  }

  const config = { ...DEFAULT_CONFIG, ...input, entity: input.entity.trim() };
  const textKeys = [
    "name",
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
  for (const key of textKeys) config[key] = text(input[key], DEFAULT_CONFIG[key]);

  config.secondary_text = typeof input.secondary_text === "string"
    ? input.secondary_text.trim()
    : DEFAULT_CONFIG.secondary_text;
  config.secondary_attribute = typeof input.secondary_attribute === "string"
    ? input.secondary_attribute.trim()
    : DEFAULT_CONFIG.secondary_attribute;

  for (const key of [
    "rain_color",
    "rain_color_end",
    "rain_accent_color",
    "dry_color",
    "dry_color_end",
    "dry_accent_color",
    "unknown_color",
    "unknown_color_end",
    "text_color",
  ]) {
    config[key] = safeColor(input[key], DEFAULT_CONFIG[key]);
  }

  for (const key of ["animation", "show_status", "show_secondary"]) {
    config[key] = typeof input[key] === "boolean" ? input[key] : DEFAULT_CONFIG[key];
  }

  return config;
}

export function resolveVisualState(state, config) {
  if (state === config.rain_state) {
    return {
      kind: "rain",
      icon: config.rain_icon,
      stateText: config.rain_text,
      statusText: config.rain_status_text,
      color: config.rain_color,
      colorEnd: config.rain_color_end,
      accent: config.rain_accent_color,
    };
  }

  if (state === config.dry_state) {
    return {
      kind: "dry",
      icon: config.dry_icon,
      stateText: config.dry_text,
      statusText: config.dry_status_text,
      color: config.dry_color,
      colorEnd: config.dry_color_end,
      accent: config.dry_accent_color,
    };
  }

  if (state === "unknown" || state === "unavailable" || state == null) {
    return {
      kind: "unavailable",
      icon: config.unavailable_icon,
      stateText: config.unavailable_text,
      statusText: config.unavailable_status_text,
      color: config.unknown_color,
      colorEnd: config.unknown_color_end,
      accent: "#cbd5e1",
    };
  }

  return {
    kind: "unknown",
    icon: config.unavailable_icon,
    stateText: config.unknown_text,
    statusText: config.unknown_status_text,
    color: config.unknown_color,
    colorEnd: config.unknown_color_end,
    accent: "#cbd5e1",
  };
}

export function resolveSecondaryText(attributes, config) {
  const attribute = config.secondary_attribute;
  if (attribute && attributes && attributes[attribute] !== undefined && attributes[attribute] !== null) {
    return String(attributes[attribute]);
  }
  return config.secondary_text;
}

export function resolveEditorValue(target, detail = undefined) {
  if (target?.dataset?.valueType === "boolean") return Boolean(target.checked);
  return detail?.value ?? target?.value;
}

export function applyEditorChange(config, key, value) {
  const next = { ...config };
  if (value === "" || value === undefined || value === null) delete next[key];
  else next[key] = value;
  return next;
}

export function getLayoutMode(width, height) {
  if (width < 240) return "tiny";
  if (height >= 112 && width >= 360) return "expanded";
  if (width < 360 || height < 72) return "compact";
  return "regular";
}
