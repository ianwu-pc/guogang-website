# 過港網站｜GitHub Pages 上傳說明

這份專案已整理成可以透過 GitHub Actions 自動發布到 GitHub Pages 的版本。網站原始碼、樣式、互動元件與使用中的圖片都保留在專案內，不需要手動把建置檔放到 `docs` 資料夾。

## 第一次上傳

1. 在 GitHub 建立一個新的 repository，例如 `guogang-website`。
2. 解壓縮 `guogang-github-pages-source.zip`。
3. 將解壓縮後的所有內容上傳到 repository 根目錄；必須保留 `.github` 隱藏資料夾。
4. 在 GitHub repository 開啟 `Settings → Pages`。
5. 在 `Build and deployment` 的 `Source` 選擇 `GitHub Actions`。
6. 開啟 repository 的 `Actions` 頁面，等待 `Deploy GitHub Pages` 完成。
7. 完成後可在 `Settings → Pages` 或該次 Action 的部署結果取得公開網址。

之後只要更新 `main` 分支，網站就會自動重新建置並發布。一般 repository 的網址格式會是：

```text
https://你的帳號.github.io/repository名稱/
```

## 日後最常修改的位置

| 內容 | 檔案或資料夾 |
| --- | --- |
| 協會名稱、聯絡資料、LINE、導覽、好物、人物與網站文字 | `app/data/site.ts` |
| 首頁 | `app/page.tsx` |
| 過港好物 | `app/goods/` |
| 認識過港與互動地圖 | `app/guogang/`、`app/components/GuogangInteractiveMap.tsx` |
| 過港人物 | `app/people/` |
| 關於我們 | `app/about/` |
| 全站顏色、字級與響應式版面 | `app/globals.css` |
| 網站圖片 | `public/images/` |
| 分享預覽圖 | `public/og-revision.png` |

新增正式圖片時，請放入 `public/images/`，再把資料中的圖片路徑寫成：

```ts
coverImage: "/images/你的圖片檔名.jpg"
```

## 已整理的圖片

- `public/images/guogang-history-1949.png`：網站目前使用的過港歷史照片。
- `public/og-revision.png`：網站連結分享時使用的預覽圖。
- `public/images/association-structure.png`：僅保留在原始碼資料中作為歷史附件，公開網站建置時會自動排除。
- `public/og.png`：舊版分享圖，公開網站建置時會自動排除。

## 不要上傳的內容

以下資料不屬於公開網站，已加入忽略清單：

- `revision/`：修訂文件與附件。
- `node_modules/`：本機安裝的程式套件。
- `dist/`、`github-pages-dist/`：自動產生的建置結果。
- `.env*`：可能包含私密設定的環境檔案。

## 專案主要結構

```text
app/                         網站頁面、元件、資料與樣式
public/                      網站圖片與分享圖
scripts/export-github-pages.mjs
                             GitHub Pages 靜態輸出程式
tests/                       網站與 GitHub Pages 輸出測試
.github/workflows/           自動發布設定
next.config.ts               GitHub repository 子路徑設定
package.json                 建置指令與套件清單
pnpm-lock.yaml               固定套件版本
```

## 本機建置（選用）

一般內容編輯不需要在本機執行指令；GitHub Actions 會自動完成。若要自行檢查 GitHub Pages 輸出，可使用 Node.js 22 與 pnpm 11：

```bash
pnpm install --frozen-lockfile
GITHUB_PAGES=true GITHUB_REPOSITORY=你的帳號/guogang-website pnpm build
GITHUB_PAGES=true GITHUB_REPOSITORY=你的帳號/guogang-website pnpm export:pages
GITHUB_PAGES=true GITHUB_REPOSITORY=你的帳號/guogang-website pnpm test:pages
```
