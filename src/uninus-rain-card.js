import { LitElement, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import {
  applyEditorChange,
  DEFAULT_CONFIG,
  formatEntityTimestamp,
  getLayoutMode,
  normalizeConfig,
  resolveEditorValue,
  resolveSecondaryText,
  resolveVisualState,
} from "./core.js";

const VERSION = "1.0.4";

class UninusRainCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _layout: { state: true },
    _cardHeight: { state: true },
  };

  constructor() {
    super();
    this._layout = "regular";
    this._cardHeight = 0;
  }

  static async getConfigElement() {
    return document.createElement("uninus-rain-card-editor");
  }

  static getStubConfig(hass) {
    const entity = Object.keys(hass?.states ?? {}).find(
      (entityId) => /^(sensor|binary_sensor)\./.test(entityId) && /rain|雨/i.test(entityId),
    );
    return { entity: entity ?? "sensor.rain_state", name: DEFAULT_CONFIG.name };
  }

  setConfig(config) {
    this._config = normalizeConfig(config);
    const { width, height } = this.getBoundingClientRect();
    if (width || height) this._updateLayout(width, height);
  }

  getCardSize() {
    return this._layout === "expanded" ? 2 : 1;
  }

  getGridOptions() {
    return {
      columns: 6,
      rows: this._layout === "expanded" ? 2 : 1,
      min_columns: 3,
      min_rows: 1,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._ensureResizeObserver();
  }

  firstUpdated() {
    this._ensureResizeObserver();
  }

  _ensureResizeObserver() {
    if (typeof ResizeObserver === "undefined") return;
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        this._updateLayout(width, height);
      });
    }
    this._resizeObserver.observe(this);
  }

  _updateLayout(width, height) {
    this._cardHeight = height;
    const next = getLayoutMode(width, height, this._config?.force_portrait);
    if (next !== this._layout) this._layout = next;
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    super.disconnectedCallback();
  }

  _openMoreInfo() {
    if (!this._config?.entity) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId: this._config.entity },
    }));
  }

  _handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this._openMoreInfo();
    }
  }

  render() {
    if (!this._config) return nothing;
    const entity = this.hass?.states?.[this._config.entity];
    const visual = resolveVisualState(entity?.state, this._config);
    const secondary = resolveSecondaryText(
      entity,
      this._config,
      (value) => formatEntityTimestamp(value, this.hass?.config?.time_zone),
    );
    const raining = visual.kind === "rain";
    const animation = this._config.animation;
    const shortPortrait = this._layout === "portrait" && this._cardHeight < 173;
    const ultraShortPortrait = this._layout === "portrait" && this._cardHeight < 96;
    const ariaLabel = [
      this._config.name,
      visual.stateText,
      this._config.show_secondary ? secondary : null,
      this._config.show_status ? visual.statusText : null,
    ].filter(Boolean).join("，");
    const cardStyle = {
      "--state-color": visual.color,
      "--state-color-end": visual.colorEnd,
      "--state-accent": visual.accent,
      "--state-text": this._config.text_color,
    };

    return html`
      <ha-card
        class="weather-card ${this._layout} ${shortPortrait ? "short-portrait" : ""} ${ultraShortPortrait ? "ultra-short-portrait" : ""} ${visual.kind} ${animation ? "animated" : ""}"
        style=${styleMap(cardStyle)}
        role="button"
        tabindex="0"
        aria-label=${ariaLabel}
        @click=${this._openMoreInfo}
        @keydown=${this._handleKeydown}
      >
        <div class="ambient" aria-hidden="true"></div>
        ${raining && animation ? html`
          <div class="rain-fx" aria-hidden="true">
            ${Array.from({ length: 9 }, (_, index) => html`<i style="--drop:${index}"></i>`)}
          </div>
        ` : nothing}

        <div class="content">
          <div class="icon-wrap" aria-hidden="true">
            <ha-icon icon=${visual.icon}></ha-icon>
          </div>

          <div class="copy">
            <div class="heading-row">
              <span class="name">${this._config.name}</span>
              ${this._config.show_secondary && secondary
                ? html`<span class="secondary">${secondary}</span>`
                : nothing}
            </div>
            <div class="state-text">${visual.stateText}</div>
          </div>

          ${this._config.show_status ? html`
            <div class="status" title=${visual.statusText}>
              <span class="status-dot"></span>
              <span class="status-label">${visual.statusText}</span>
            </div>
          ` : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      min-width: 0;
      container-type: inline-size;
    }

    ha-card {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 64px;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      border-radius: var(--ha-card-border-radius, 16px);
      color: var(--state-text);
      background: linear-gradient(135deg, var(--state-color), var(--state-color-end));
      border: 1px solid color-mix(in srgb, var(--state-accent) 32%, transparent);
      box-shadow: 0 8px 22px color-mix(in srgb, var(--state-color) 34%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.17);
      cursor: pointer;
      isolation: isolate;
      transition: box-shadow 240ms ease, transform 160ms ease, background 240ms ease;
      -webkit-tap-highlight-color: transparent;
    }

    ha-card:hover {
      transform: translateY(-1px);
      box-shadow: 0 10px 28px color-mix(in srgb, var(--state-color) 42%, transparent),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    ha-card:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--state-accent) 76%, white);
      outline-offset: 2px;
    }

    .content {
      position: relative;
      z-index: 3;
      height: 100%;
      min-height: 64px;
      box-sizing: border-box;
      display: grid;
      grid-template-columns: clamp(40px, 11cqi, 52px) minmax(0, 1fr) auto;
      align-items: center;
      gap: clamp(8px, 2.6cqi, 14px);
      padding: clamp(7px, 2cqi, 12px) clamp(10px, 3cqi, 18px);
    }

    .icon-wrap {
      width: clamp(38px, 10cqi, 48px);
      aspect-ratio: 1;
      display: grid;
      place-items: center;
      border-radius: clamp(11px, 3cqi, 15px);
      color: var(--state-text);
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.17);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(8px);
    }

    .icon-wrap ha-icon {
      --mdc-icon-size: clamp(24px, 6.8cqi, 33px);
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--state-accent) 60%, transparent));
    }

    .copy {
      min-width: 0;
      display: grid;
      align-content: center;
      gap: 3px;
    }

    .heading-row {
      min-width: 0;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }

    .name {
      flex: 0 0 auto;
      color: rgba(255, 255, 255, 0.82);
      font-size: clamp(10px, 2.7cqi, 13px);
      font-weight: 600;
      letter-spacing: 0.06em;
      line-height: 1.1;
      white-space: nowrap;
    }

    .secondary {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.58);
      font-size: clamp(9px, 2.4cqi, 11px);
      font-weight: 500;
    }

    .state-text {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--state-text);
      font-size: clamp(15px, 4.5cqi, 22px);
      font-weight: 750;
      letter-spacing: 0.01em;
      line-height: 1.15;
      text-shadow: 0 1px 7px rgba(0, 0, 0, 0.18);
    }

    .status {
      min-width: max-content;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      color: white;
      background: rgba(15, 23, 42, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      font-size: clamp(10px, 2.5cqi, 12px);
      font-weight: 700;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }

    .status-dot {
      width: 7px;
      height: 7px;
      flex: 0 0 7px;
      border-radius: 50%;
      background: var(--state-accent);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--state-accent) 17%, transparent),
        0 0 10px color-mix(in srgb, var(--state-accent) 78%, transparent);
    }

    .ambient {
      position: absolute;
      z-index: 0;
      top: -60%;
      right: -10%;
      width: min(42cqi, 180px);
      aspect-ratio: 1;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.23), transparent 68%);
    }

    .rain-fx {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.34;
    }

    .rain-fx i {
      --x: calc(5% + var(--drop) * 12%);
      position: absolute;
      top: -35%;
      left: var(--x);
      width: 2px;
      height: clamp(17px, 5cqi, 28px);
      border-radius: 999px;
      background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.94));
      transform: rotate(12deg);
      animation: rain-drop calc(1.05s + var(--drop) * 0.06s) linear infinite;
      animation-delay: calc(var(--drop) * -0.19s);
    }

    ha-card.rain.animated {
      animation: rain-card-alert 2.5s ease-in-out infinite;
    }

    ha-card.rain.animated .status-dot {
      animation: status-pulse 1.25s ease-in-out infinite;
    }

    ha-card.dry.animated .icon-wrap ha-icon {
      animation: clear-icon-float 4s ease-in-out infinite;
    }

    ha-card.expanded .content {
      min-height: 112px;
      grid-template-columns: clamp(52px, 12cqi, 72px) minmax(0, 1fr) auto;
      padding-block: clamp(14px, 4cqi, 24px);
    }

    ha-card.expanded .icon-wrap {
      width: clamp(52px, 11cqi, 68px);
    }

    ha-card.expanded .icon-wrap ha-icon {
      --mdc-icon-size: clamp(31px, 7cqi, 42px);
    }

    ha-card.expanded .state-text {
      font-size: clamp(21px, 5.2cqi, 30px);
    }

    ha-card.portrait .content {
      min-height: 120px;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto;
      justify-items: center;
      align-content: center;
      gap: clamp(8px, 5cqi, 16px);
      padding: clamp(12px, 8cqi, 22px) clamp(10px, 8cqi, 20px);
    }

    ha-card.portrait .icon-wrap {
      width: clamp(44px, 28cqi, 64px);
      border-radius: clamp(12px, 8cqi, 18px);
    }

    ha-card.portrait .icon-wrap ha-icon {
      --mdc-icon-size: clamp(27px, 18cqi, 38px);
    }

    ha-card.portrait .copy {
      width: 100%;
      justify-items: center;
      gap: 6px;
      text-align: center;
    }

    ha-card.portrait .heading-row {
      width: 100%;
      flex-direction: column;
      align-items: center;
      gap: 3px;
    }

    ha-card.portrait .name {
      font-size: clamp(10px, 7cqi, 13px);
    }

    ha-card.portrait .secondary {
      max-width: 100%;
      font-size: clamp(9px, 6cqi, 11px);
    }

    ha-card.portrait .state-text {
      display: -webkit-box;
      overflow: hidden;
      overflow-wrap: anywhere;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      white-space: normal;
      text-align: center;
      font-size: clamp(15px, 10cqi, 22px);
    }

    ha-card.portrait .status {
      justify-self: center;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    ha-card.portrait .status-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    ha-card.portrait.short-portrait .content {
      min-height: 0;
      grid-template-rows: 30px auto 18px;
      gap: 3px;
      padding: 4px 8px;
    }

    ha-card.portrait.short-portrait .icon-wrap {
      width: 30px;
      border-radius: 9px;
    }

    ha-card.portrait.short-portrait .icon-wrap ha-icon {
      --mdc-icon-size: 18px;
    }

    ha-card.portrait.short-portrait .copy {
      gap: 2px;
    }

    ha-card.portrait.short-portrait .heading-row {
      flex-direction: row;
      justify-content: center;
      gap: 5px;
    }

    ha-card.portrait.short-portrait .name {
      font-size: 9px;
    }

    ha-card.portrait.short-portrait .secondary {
      font-size: 8px;
    }

    ha-card.portrait.short-portrait .state-text {
      -webkit-line-clamp: 1;
      font-size: 13px;
      line-height: 1.05;
    }

    ha-card.portrait.short-portrait .status {
      min-height: 18px;
      gap: 4px;
      padding: 2px 6px;
      font-size: 9px;
    }

    ha-card.portrait.short-portrait .status-dot {
      width: 5px;
      height: 5px;
      flex-basis: 5px;
    }

    ha-card.portrait.ultra-short-portrait .content {
      grid-template-rows: 18px auto 10px;
      gap: 1px;
      padding: 2px 6px;
    }

    ha-card.portrait.ultra-short-portrait .icon-wrap {
      width: 18px;
      border-radius: 6px;
    }

    ha-card.portrait.ultra-short-portrait .icon-wrap ha-icon {
      --mdc-icon-size: 12px;
    }

    ha-card.portrait.ultra-short-portrait .copy {
      gap: 1px;
    }

    ha-card.portrait.ultra-short-portrait .secondary {
      display: none;
    }

    ha-card.portrait.ultra-short-portrait .name {
      font-size: 8px;
    }

    ha-card.portrait.ultra-short-portrait .state-text {
      font-size: 11px;
      line-height: 1;
    }

    ha-card.portrait.ultra-short-portrait .status {
      width: 10px;
      height: 10px;
      min-width: 10px;
      min-height: 10px;
      padding: 0;
      border: 0;
      background: transparent;
    }

    ha-card.portrait.ultra-short-portrait .status-label {
      display: none;
    }

    ha-card.portrait.ultra-short-portrait .status-dot {
      width: 4px;
      height: 4px;
      flex-basis: 4px;
    }

    ha-card.compact .content {
      grid-template-columns: 40px minmax(0, 1fr) auto;
      gap: 8px;
      padding: 7px 10px;
    }

    ha-card.compact .icon-wrap {
      width: 38px;
    }

    ha-card.compact .status {
      padding: 5px 8px;
    }

    ha-card.tiny .content {
      grid-template-columns: 36px minmax(0, 1fr) 18px;
      gap: 7px;
      padding: 6px 8px;
    }

    ha-card.tiny .icon-wrap {
      width: 34px;
      border-radius: 10px;
    }

    ha-card.tiny .icon-wrap ha-icon {
      --mdc-icon-size: 22px;
    }

    ha-card.tiny .secondary,
    ha-card.tiny .status-label {
      display: none;
    }

    ha-card.tiny .status {
      width: 18px;
      height: 18px;
      min-width: 18px;
      box-sizing: border-box;
      display: grid;
      place-items: center;
      padding: 0;
      border: 0;
      background: transparent;
    }

    ha-card.tiny .state-text {
      font-size: clamp(13px, 7cqi, 16px);
    }

    @keyframes rain-drop {
      0% { transform: translate3d(8px, -25px, 0) rotate(12deg); opacity: 0; }
      14% { opacity: 1; }
      100% { transform: translate3d(-24px, 180px, 0) rotate(12deg); opacity: 0; }
    }

    @keyframes rain-card-alert {
      0%, 100% {
        box-shadow: 0 8px 22px color-mix(in srgb, var(--state-color) 34%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.17);
      }
      50% {
        box-shadow: 0 10px 32px color-mix(in srgb, var(--state-accent) 52%, transparent),
          0 0 0 2px color-mix(in srgb, var(--state-accent) 13%, transparent),
          inset 0 1px 0 rgba(255, 255, 255, 0.22);
      }
    }

    @keyframes clear-icon-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes status-pulse {
      0%, 100% { transform: scale(0.9); opacity: 0.78; }
      50% { transform: scale(1.18); opacity: 1; }
    }

    @media (prefers-reduced-motion: reduce) {
      ha-card,
      .rain-fx i,
      .status-dot,
      .icon-wrap ha-icon {
        animation: none !important;
        transition: none !important;
      }
    }
  `;
}

class UninusRainCardEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = { ...config };
  }

  _changed(event) {
    const key = event.currentTarget.dataset.key;
    const value = resolveEditorValue(event.currentTarget, event.detail);
    this._emit(key, value);
  }

  _entityChanged(event) {
    this._emit("entity", event.detail?.value ?? event.target.value);
  }

  _emit(key, value) {
    this._config = applyEditorChange(this._config ?? {}, key, value);
    this.dispatchEvent(new CustomEvent("config-changed", {
      bubbles: true,
      composed: true,
      detail: { config: this._config },
    }));
  }

  _textField(key, label) {
    return html`
      <label class="text-field">
        <span>${label}</span>
        <input
          type="text"
          .value=${this._config?.[key] ?? DEFAULT_CONFIG[key] ?? ""}
          data-key=${key}
          @change=${this._changed}
        >
      </label>
    `;
  }

  _colorField(key, label) {
    const value = this._config?.[key] ?? DEFAULT_CONFIG[key];
    const pickerValue = /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_CONFIG[key];
    return html`
      <label class="color-field">
        <span>${label}</span>
        <div>
          <input type="color" .value=${pickerValue} data-key=${key} @change=${this._changed}>
          <code>${value}</code>
        </div>
      </label>
    `;
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    const entity = this.hass.states?.[this._config.entity];
    const attributes = Object.keys(entity?.attributes ?? {})
      .filter((attribute) => attribute !== "last_changed" && attribute !== "last_updated")
      .sort();

    return html`
      <div class="editor">
        <section>
          <h3>基本設定</h3>
          <label class="field-label">降雨 Entity</label>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${this._config.entity ?? ""}
            .includeDomains=${["sensor", "binary_sensor"]}
            allow-custom-entity
            @value-changed=${this._entityChanged}
          ></ha-entity-picker>
          <div class="two-columns">
            ${this._textField("name", "卡片名稱")}
            ${this._textField("secondary_text", "左側副標文字")}
          </div>
          <label class="select-field">
            <span>副標資訊來源（Attribute／Entity 時間）</span>
            <select data-key="secondary_attribute" @change=${this._changed}>
              <option value="">不使用 Attribute</option>
              <option value="last_changed" ?selected=${this._config.secondary_attribute === "last_changed"}>
                上次變更時間（last_changed）
              </option>
              <option value="last_updated" ?selected=${this._config.secondary_attribute === "last_updated"}>
                最後更新時間（last_updated）
              </option>
              ${attributes.map((attribute) => html`
                <option value=${attribute} ?selected=${this._config.secondary_attribute === attribute}>
                  ${attribute}
                </option>
              `)}
            </select>
          </label>
        </section>

        <section>
          <h3>狀態判斷與文字</h3>
          <div class="two-columns">
            ${this._textField("rain_state", "下雨狀態值")}
            ${this._textField("dry_state", "沒下雨狀態值")}
            ${this._textField("rain_text", "下雨主要文字")}
            ${this._textField("dry_text", "沒下雨主要文字")}
            ${this._textField("unavailable_text", "無法使用主要文字")}
            ${this._textField("unknown_text", "異常主要文字")}
            ${this._textField("rain_status_text", "下雨徽章文字")}
            ${this._textField("dry_status_text", "沒下雨徽章文字")}
            ${this._textField("unavailable_status_text", "無資料徽章文字")}
            ${this._textField("unknown_status_text", "異常徽章文字")}
            ${this._textField("rain_icon", "下雨圖示")}
            ${this._textField("dry_icon", "沒下雨圖示")}
            ${this._textField("unavailable_icon", "異常圖示")}
          </div>
        </section>

        <section>
          <h3>狀態顏色</h3>
          <div class="colors">
            ${this._colorField("rain_color", "下雨起始色")}
            ${this._colorField("rain_color_end", "下雨結束色")}
            ${this._colorField("rain_accent_color", "下雨強調色")}
            ${this._colorField("dry_color", "正常起始色")}
            ${this._colorField("dry_color_end", "正常結束色")}
            ${this._colorField("dry_accent_color", "正常強調色")}
            ${this._colorField("unknown_color", "異常起始色")}
            ${this._colorField("unknown_color_end", "異常結束色")}
            ${this._colorField("text_color", "文字顏色")}
          </div>
        </section>

        <section>
          <h3>顯示與動畫</h3>
          <div class="toggles">
            ${this._switch("animation", "啟用雨滴及狀態動畫")}
            ${this._switch("force_portrait", "強制使用直式版面")}
            ${this._switch("show_secondary", "顯示左側副標")}
            ${this._switch("show_status", "顯示右側狀態徽章")}
          </div>
        </section>
      </div>
    `;
  }

  _switch(key, label) {
    const checked = this._config?.[key] ?? DEFAULT_CONFIG[key];
    return html`
      <label class="switch-row">
        <span>${label}</span>
        <ha-switch .checked=${checked} data-key=${key} data-value-type="boolean" @change=${this._changed}></ha-switch>
      </label>
    `;
  }

  static styles = css`
    :host { display: block; }
    .editor { display: grid; gap: 16px; color: var(--primary-text-color); }
    section {
      display: grid;
      gap: 12px;
      padding: 14px;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      background: color-mix(in srgb, var(--card-background-color) 94%, var(--primary-color) 6%);
    }
    h3 { margin: 0; font-size: 15px; font-weight: 700; }
    ha-entity-picker { width: 100%; }
    .field-label, .select-field > span, .text-field > span {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .two-columns, .colors { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .select-field, .text-field { min-width: 0; display: grid; gap: 7px; }
    .text-field input, select {
      width: 100%;
      box-sizing: border-box;
      min-height: 44px;
      padding: 0 12px;
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
    }
    .color-field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    .color-field > span { min-width: 0; font-size: 12px; }
    .color-field > div { display: flex; align-items: center; gap: 7px; }
    input[type="color"] { width: 30px; height: 30px; padding: 0; border: 0; background: none; cursor: pointer; }
    code { font-size: 10px; color: var(--secondary-text-color); }
    .toggles { display: grid; gap: 4px; }
    .switch-row { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    @media (max-width: 560px) {
      .two-columns, .colors { grid-template-columns: 1fr; }
    }
  `;
}

if (!customElements.get("uninus-rain-card")) {
  customElements.define("uninus-rain-card", UninusRainCard);
}
if (!customElements.get("uninus-rain-card-editor")) {
  customElements.define("uninus-rain-card-editor", UninusRainCardEditor);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "uninus-rain-card")) {
  window.customCards.push({
    type: "uninus-rain-card",
    name: "Uninus Rain Card",
    description: "專業、動畫化且自適應的 Home Assistant 降雨感測卡片",
    preview: true,
    documentationURL: "https://github.com/ivanlee1007/uninus-rain-card",
  });
}

export { UninusRainCard, UninusRainCardEditor, VERSION };
