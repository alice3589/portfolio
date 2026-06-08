# ポートフォリオ — 岩崎 琉斗 (IWASAKI Ryuto)

Web・ゲーム・アプリ開発と、スピードラン（RTA）向けツール制作の作品をまとめた個人ポートフォリオサイトです。

🔗 公開URL: https://alice3589.github.io/portfolio/

## デザイン

[yui540.com](https://yui540.com/) を参考に、**動き主体（モーション中心）のアート寄りデザイン**で構成しています。

- オーバーサイズの和文タイポグラフィ（明朝＋ゴシック）
- スクロール連動のリビール演出、視差、速度反応マーキー
- カスタムカーソル（mix-blend）とローディング演出
- 手書き風テキストは [tegaki](https://gkurt.com/tegaki/)（Caveat バンドル）で描画

## 技術

| 種類 | 使用 |
| --- | --- |
| スクロール | [Lenis](https://github.com/darkroomengineering/lenis)（滑らかスクロール） |
| アニメーション | [GSAP](https://gsap.com/) + ScrollTrigger |
| 手書き演出 | [tegaki](https://www.npmjs.com/package/tegaki)（`<tegaki-renderer>` Web Component / CDN 読み込み） |
| フォント | Zen Kaku Gothic New / Shippori Mincho / Archivo（Google Fonts） |

すべて CDN 経由で読み込むため**ビルド不要の静的サイト**です。

## 構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | ページ本体 |
| `styles.css` | デザイン全体 |
| `main.js` | ローダー・カーソル・スクロール演出 |
| `assets/images/` | 画像素材 |

## ローカルで開く

```bash
python -m http.server 8000
# → http://localhost:8000
```

> `prefers-reduced-motion` を有効にしている環境では、演出を無効化して即時表示します。
