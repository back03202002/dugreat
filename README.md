# 肚格瑞 DUGREAT｜正式部署版 V15

## 已完成
- 電腦版、平板與手機版響應式排版
- 首頁、品種館、8 個犬貓品種頁與 404 頁
- 品種常見健康風險、注意症狀與資料來源
- 圖片不裁切重點、圖片尺寸屬性與延遲載入
- 手機導覽、搜尋、篩選、圖片燈箱與返回頂部
- SEO 標題、描述、Organization / Article JSON-LD、Open Graph
- Vercel 快取與基本安全標頭

## Vercel 部署
1. 將本資料夾內容上傳至 GitHub 專案根目錄，或直接拖曳整個資料夾到 Vercel。
2. Framework Preset 選 `Other`，不需 Build Command。
3. Output Directory 留空。

## 正式網域確認後
將 `sitemap.xml` 裡的 `https://YOUR-DOMAIN` 批次替換成正式網域，並在 `robots.txt` 加入 Sitemap 網址。
