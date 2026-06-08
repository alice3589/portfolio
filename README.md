# ポートフォリオ — 岩崎 琉斗 (IWASAKI Ryuto)

Web・ゲーム・アプリ開発と、スピードラン（RTA）向けツール制作の作品をまとめた個人ポートフォリオサイトです。

🔗 公開URL: https://alice3589.github.io/portfolio/

## デザイン

NieR: Automata を意識した **セピア × ミニマルUI** で構成しています。

- 紙のようなサンドカラーの背景に、墨色のセリフ見出し
- ホバー／選択時に「反転（濃色塗り＋淡色文字）」するメニュー表現
- オープニングは GSAP による猫アニメーション（`prefers-reduced-motion` でスキップ）

## 構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | ページ本体（自己紹介・スキル・制作物・経歴・連絡先） |
| `styles.css` | デザイントークンと全体のスタイル |
| `script.js` | メニュー開閉・スクロール演出・連絡先フォーム |
| `splash.css` / `splash.js` | オープニングの猫アニメーション |
| `assets/images/` | 画像素材 |

## ローカルで開く

ビルド不要の静的サイトです。任意の HTTP サーバーで配信できます。

```bash
# 例: Python の簡易サーバー
python -m http.server 8000
# → http://localhost:8000
```

## 技術

HTML / CSS / Vanilla JavaScript / [GSAP](https://gsap.com/)（アニメーション）

外部依存は CDN 経由の GSAP と Google Fonts（Noto Sans/Serif JP）、アイコンの [Simple Icons](https://simpleicons.org/) のみです。
