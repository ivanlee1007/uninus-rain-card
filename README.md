# Uninus Rain Card

一張專為 Home Assistant Lovelace 設計的專業降雨感測卡片。它會依照實際卡片寬度與高度自動切換版面、縮放圖示與字型，並以明確色彩及動畫提醒使用者目前是否下雨。

## 特色

- 🌧️ 下雨時顯示雨滴、警示光暈與脈衝動畫
- 🌤️ 沒下雨時使用安靜的藍綠漸層與漂浮圖示
- 📐 透過 `ResizeObserver` 依卡片實際寬高切換 tiny、compact、regular、expanded 版面
- 🔤 使用 `clamp()` 與 container query 單位自動縮放圖示及字型
- 🎛️ 完整 Lovelace 視覺化設定 UI
- 🧩 支援 `sensor` 與 `binary_sensor`
- 🏷️ 副標可顯示自訂文字或指定 entity attribute
- 🎨 可設定下雨、正常、異常狀態的起始色、結束色與強調色
- ♿ 鍵盤操作、螢幕閱讀器標籤及 `prefers-reduced-motion`
- 📦 HACS Lovelace repository 相容

## 安裝

### HACS 自訂 Repository

1. 開啟 HACS。
2. 進入「Frontend」。
3. 右上角選單開啟「Custom repositories」。
4. 加入：

   ```text
   https://github.com/ivanlee1007/uninus-rain-card
   ```

5. 類型選擇 `Dashboard`。
6. 搜尋並安裝 **Uninus Rain Card**。
7. 重新整理瀏覽器。

### 手動安裝

1. 從最新 Release 下載 `uninus-rain-card.js`。
2. 放到 Home Assistant 的 `/config/www/uninus-rain-card.js`。
3. 在「設定 → 儀表板 → 資源」加入：

   ```text
   /local/uninus-rain-card.js
   ```

4. 資源類型選擇 `JavaScript Module`。

## 快速開始

```yaml
type: custom:uninus-rain-card
entity: sensor.rain_state
name: 降雨監測
```

預設狀態值：

- `下雨中`：警示狀態
- `沒下雨`：正常狀態
- `unknown`、`unavailable`：無資料狀態
- 其他值：異常狀態，卡片會直接顯示原始狀態文字

## 視覺化設定 UI

在 Lovelace 編輯模式新增 **Uninus Rain Card** 後，可直接設定：

### 基本設定

| 選項 | 說明 |
|---|---|
| 降雨 Entity | 要監測的 `sensor` 或 `binary_sensor` |
| 卡片名稱 | 左側上方名稱 |
| 左側副標文字 | 顯示於名稱右側的補充文字 |
| 副標 Attribute | 若 attribute 有值，優先取代自訂副標文字 |

### 狀態與文字

| 選項 | 預設值 |
|---|---|
| 下雨狀態值 | `下雨中` |
| 沒下雨狀態值 | `沒下雨` |
| 下雨主要文字 | `偵測到降雨` |
| 沒下雨主要文字 | `目前沒有降雨` |
| 下雨徽章文字 | `請注意` |
| 沒下雨徽章文字 | `正常` |
| 下雨圖示 | `mdi:weather-pouring` |
| 沒下雨圖示 | `mdi:weather-partly-cloudy` |

### 顏色與顯示

UI 可分別調整下雨、正常與異常狀態的漸層色，也能關閉：

- 雨滴及狀態動畫
- 左側副標
- 右側狀態徽章

## 完整 YAML 範例

```yaml
type: custom:uninus-rain-card
entity: sensor.rain_state
name: 屋頂降雨監測
secondary_text: 北棟屋頂
secondary_attribute: station_name

rain_state: 下雨中
dry_state: 沒下雨
rain_text: 偵測到降雨
dry_text: 目前沒有降雨
rain_status_text: 請注意
dry_status_text: 正常

rain_icon: mdi:weather-pouring
dry_icon: mdi:weather-partly-cloudy

rain_color: "#7f1d1d"
rain_color_end: "#ea580c"
rain_accent_color: "#fca5a5"
dry_color: "#064e59"
dry_color_end: "#0d9488"
dry_accent_color: "#67e8f9"
unknown_color: "#334155"
unknown_color_end: "#475569"
text_color: "#ffffff"

animation: true
show_secondary: true
show_status: true

grid_options:
  columns: 6
  rows: 1
```

## 自適應版面

卡片不是只依瀏覽器 viewport 判斷，而是監測自己的實際尺寸：

| 模式 | 條件概念 | 行為 |
|---|---|---|
| tiny | 寬度低於約 240px | 隱藏副標及徽章文字，只保留狀態點 |
| compact | 寬度偏窄或高度低於約 72px | 縮小間距、圖示與徽章 |
| regular | 一般卡片尺寸 | 完整橫向資訊版面 |
| expanded | 高度至少約 112px 且有足夠寬度 | 放大圖示、主要文字及內距 |

因此卡片可用於 Sections、Masonry 與不同欄數的 Grid 版面。

## 開發

```bash
npm install
npm test
npm run build
npm run check
```

產出的 HACS/瀏覽器檔案為專案根目錄的：

```text
uninus-rain-card.js
```

## 授權

[MIT](LICENSE)
