# Mockup Starter

Figma MCP + Chrome MCP + Codex で静的モックアップを素早く作るためのスターターです。

## Stack

- EJS
- SCSS
- Tailwind CSS CLI
- Vanilla JavaScript

## Setup

```bash
npm install
npm run build
```

開発中は以下を使います。

```bash
npm run watch
```

ローカル確認は任意の静的サーバーで行います。

```bash
python3 -m http.server 4173
```

## Editable Files

- HTML: `src/ejs/index.ejs`
- Header partial: `src/ejs/partials/_header.ejs`
- SCSS: `src/scss/input.scss`
- SCSS base tokens and mixins: `src/scss/_base.scss`
- JavaScript: `assets/js/main.js`
- Images: `assets/img/`

Generated files:

- `index.html`
- `assets/css/style.css`

## Workflow

1. Figma MCPで対象セクションを読み取る
2. まだ実装せず、構造・差分・曖昧点を整理する
3. EJSとTailwind中心で実装する
4. 複雑なアニメーション、Swiper、z-index、overflowはSCSSに分離する
5. `npm run build`
6. Chrome MCPでPC/SP表示とコンソールを確認する
7. レビュー担当として問題点を分類する

## Tailwind Reference

`tailwind-reference.html` に、このスターターでよく使うTailwind classの簡易説明を置いています。

## Notes

- Tailwindはmobile firstで使います
- PCは `md:` 以上のclassで上書きします
- Swiperを使う場合は `.swiper > .swiper-wrapper > .swiper-slide` の標準構造を崩さないでください
