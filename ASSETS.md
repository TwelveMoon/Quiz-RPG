# 遊戲素材資料夾

自 2026 年 9 月 12 日起，遊戲與管理後台改用以下分類位置。

| 內容 | 位置 |
|---|---|
| 角色卡面 | `assets/characters/cards/` |
| 角色大頭像 | `assets/characters/avatars/` |
| 九格動作圖 | `assets/characters/sprites/` |
| 舊版動作圖原稿 | `assets/characters/sprites/legacy/` |
| 敵人、菁英、首領 | `assets/enemies/` 的對應子資料夾 |
| 大廳與戰鬥背景 | `assets/backgrounds/` |
| 轉蛋海報、圖示與介面圖片 | `assets/ui/` |
| 音樂 | `assets/audio/music/` |
| 題庫與題庫版本 | `data/questions.json`、`data/version.json` |

每一類的 `optimized/` 存放壓縮檔。完整檔名、位置、Git 檔案指紋與容量對照在 [assets/catalog.json](assets/catalog.json)。動作圖與透明圖片使用無損 WebP，保持尺寸、透明度與九格排列。部分不透明圖片使用高品質 WebP；較大的音樂使用 128 kbps MP3。壓縮後更大的檔案沿用原檔。

目前測試版使用壓縮選項；正式版已切換分類路徑，但仍使用原格式，壓縮正式啟用要等實機驗收。玩家已有內容相符的原格式快取會繼續使用，不強迫重抓成壓縮格式。

## 後續放檔案的方式

1. 新素材直接放進對應分類資料夾，不再放到根目錄。
2. 保留原圖；需要壓縮時新增到該類的 `optimized/`，不要拿壓縮圖反覆壓縮。
3. 用檔案的實際 Git 指紋更新 `assets/catalog.json`、遊戲的素材清單與後台資料表 URL。變更內容時也要更新清單內對應指紋，不能只覆蓋圖片而沿用舊指紋。
4. 題庫更新請同時更新 `data/questions.json` 與 `data/version.json`。在舊頁相容期間，根目錄的同名題庫也同步更新。
5. 前奏／循環配對音樂保持配對關係、檔名與時長，並在遊戲中實際播放驗收。

## 舊連結相容

根目錄的既有素材與題庫暫時保留，服務尚未關閉的舊版遊戲頁、舊快取以及回復需求。它們是相容副本，未來新增內容不要再以根目錄為主要來源。確認舊版退役並另做移除核對後，才能清除這些副本。整理資料夾本身不等於學生重新下載整套素材，也不代表 Git 歷史容量會縮小。
