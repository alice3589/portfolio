# ポートフォリオ — 岩崎 琉斗 (IWASAKI Ryuto)

Web・ゲーム・アプリ開発と、スピードラン（RTA）向けツール制作の作品をまとめた個人ポートフォリオサイトです。

🔗 公開URL: https://alice3589.github.io/portfolio/

## 構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | ページ本体（自己紹介・スキル・制作物・経歴・連絡先） |
| `styles.css` | 全体のスタイル |
| `script.js` | メニュー開閉・スクロール演出・背景切り替え・連絡先フォーム |
| `splash.css` / `splash.js` | オープニングの猫アニメーション（GSAP） |
| `assets/images/` | 画像素材（アイコン・背景） |

## ローカルで開く

ビルド不要の静的サイトです。任意の HTTP サーバーで配信できます。

```bash
# 例: Python の簡易サーバー
python -m http.server 8000
# → http://localhost:8000
```

## 技術

HTML / CSS / Vanilla JavaScript / [GSAP](https://gsap.com/)（アニメーション）
