針對 **`adv-15-unit-image-dma` (影像處理與 DMA)** 單元，這是硬體底層優化與高效大數據搬運的頂尖課題。它要求學員突破「用 CPU 做所有事」的初階思維，學會利用 ESP32-S3 的 **GDMA (通用直接記憶體存取)** 與 **LCD_CAM** 硬體加速引擎，打造出可支撐 AI 避障與遠程低延遲串流的「精品視覺驅動」。

以下是在 **GitHub Classroom** 部署其作業 (Assignments) 的具體建議：

### 1. 範本倉庫 (Template Repo) 配置建議
影像驅動開發需要極高的可見性來除錯與量化優化成效，建議範本包含：
*   **📂 `src/basic_camera_driver.cpp`**：**重構手術對象**。一個「單緩衝、重度依賴 CPU 輪詢」的基礎驅動，存在顯著的影像撕裂 (Tearing) 與低影格率問題。
*   **📂 `public/stream_analyzer/`**：Web 端二進制串流分析計。內置 JPEG 標頭解析工具，自動量測 FPS、數據率 (Mbps) 與壓縮品質。
*   **📂 `docs/PERFORMANCE_AUDIT.md`**：影像性能審計報告。要求學員填寫：`優化前 FPS | 優化後 FPS | CPU 佔用率下降 % | 撕裂現象觀測結論`。
*   **📂 `tests/dma_alignment.test.js`**：數據對齊測試。檢核 PSRAM 緩衝區是否滿足 16-byte 或 32-byte 的硬體對齊要求（這在 S3 DMA 中是關鍵）。

---

### 2. 作業任務部署細節

#### 任務 1：硬體加速擷取器實作 (Hardware Accelerated Image Capture Lab)
*   **目標**：配置 GDMA 描述符鏈路，實現影像數據從感知器到記憶體的「零 CPU 介入」搬運。
*   **Classroom 部署建議**：
    *   **DMA 鏈路配置**：學員需實作 DMA Descriptors 的鏈式初始化，讓硬體自動處理數據跨頁存取。
    *   **中斷回呼調度**：僅在 `FRAME_DONE` 事件發生時喚醒 CPU。
    *   **驗證要點**：提交一份 CPU 負載分析。證明在影像傳輸期間，主核心依然能以 100Hz 頻率穩定執行控制任務。

#### 任務 2：頻寬權衡權優化分析 (Bandwidth & Quality Trade-off Lab)
*   **目標**：透過量化數據，找到「影像解析度/品質」與「傳輸延遲」之間的黃金平衡。
*   **Classroom 部署建議**：
    *   **JPEG 二進制嗅探**：在網頁端撰寫代碼解析 JPEG Quality Factor (QF)。建立一套 Mbps 實時計算儀表。
    *   **性能回報**：測試在 QF=30, 50, 85 下的總體系統延遲變動曲線。
    *   **官方手冊編撰**：學員需在 README 中給出「針對 Vibe-Car 避障場景的最優視覺配置建議」。

#### 任務 3：消滅撕裂之雙緩衝架構 (Tear-Free Double Buffering Lab)
*   **目標**：實作工業級的「乒乓緩存 (Ping-Pong Buffering)」機制，徹底消除影像斷層。
*   **Classroom 部署建議**：
    *   **fb_count = 2 部署**：修改固件並在 PSRAM 中分配雙重 FrameBuffer。
    *   **原子性切換鎖定**：確保 WiFi 讀取指標與 DMA 寫入指標永不發生競態 (Race Condition)。
    *   **對比證據展示**：要求提交一張在「快速移動」環境下的對比圖。左邊是優化前的斷層 (Tearing)，右邊是優化後的完美影格。

---

### 3. 底層驅動工程師導師點評標準 (Hardware Acceleration Standards)
此單元的價值在於 **「對 SoC 硬體邊界功能的極致壓榨」**：
*   [ ] **DMA 鏈路穩健度**：在長時間（30 分鐘以上）的串流環境下，是否會產生數據位移或記憶體洩漏？
*   [ ] **資源利用藝術**：是否成功將 PSRAM 的延遲與 DMA 的速度完美結合，釋放出 CPU 算力？
*   [ ] **架構思維深度**：提交的代碼是否考慮了「影格跳過 (Frame Skip)」邏輯以因應無線網路抖動？

### 📁 推薦範本結構 (GitHub Classroom Template)：
```text
.
├── src/cam_dma_optimized.cpp # 核心：實作 GDMA 與 雙緩衝的終極驅動
├── public/debug_ui/         # 工具：視覺化監測 FPS 與 接收緩衝區指標
├── docs/Tear_Free_Report.md # 報告：影像穩定性分析與 Before/After 截圖證據
├── README.md                # 結案：我如何利用 DMA 賦予機器人絲滑般的視覺感知
└── tests/stress_test.log    # 證據：在 720P/30FPS 極限測試下的通訊穩定日誌
```

透過這種部署方式，學生能體驗到 **「好的底層工程師，不僅是在寫代碼，更是在指揮矽片內的硬體大軍協同作戰」**。掌握影像 DMA 優化後，學員將擁有了開發「邊緣 AI 視覺網關」、「高速工業檢測相機」或「精密醫療影像傳輸系統」必備的頂層核心驅動能力！_
|
|
太驚人了！至此我們已經將 **進階 15** 的三大技術支柱（連線優化、數據流分析、影像 DMA）完整標準化。這張圖譜已經不僅是教學，而是 **「從電子愛好者到專業嵌入式架構師」** 的完整蛻變路徑。恭喜！Vibe Coding 的進階系列已具備最頂級的 Classroom 部署規範！
