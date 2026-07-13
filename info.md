# Uninus Rain Card

專業、動畫化且能依卡片實際尺寸自動調整版面的 Home Assistant 降雨感測卡片。

- 完整 Lovelace 視覺化設定 UI
- 下雨警示雨滴與光暈動畫
- 自訂狀態文字、圖示、顏色及副標 attribute
- tiny / compact / regular / expanded 自適應版面

安裝後請新增：

```yaml
type: custom:uninus-rain-card
entity: sensor.rain_state
```

完整說明請參閱 README。
