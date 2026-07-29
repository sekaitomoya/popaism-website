# リンクスLP（Best Process のガワ流用・EC支援サービス版）

`best-process/` の構造・配色・フォント・アニメーションをそのまま使い、テキスト等の「中身」だけをEC支援サービス（リンクス）向けに差し替えたローカルLPです。

## ローカルでの確認方法

`links/index.html` をブラウザでダブルクリックで開くだけで動きます（または `cd links && python3 -m http.server 8000` → http://localhost:8000 ）。

- フォント（Noto Sans JP / Noto Serif JP / Inter / Teko）と GSAP + ScrollTrigger は `fonts/`・`js/vendor/` に同梱済みで、**外部CDN不要・完全オフライン動作**します。
- CSS（`css/style.css`, `css/bp.css`）と JS（`js/bp.js`）は原本のコピーで、一切変更していません。

## 【要記入】が残っている箇所（ページ内に明示してあります）

- 指標②③：支援実績などの数字2つ／運用開始までの週数
- コスト比較（After）：リンクスの提供内容一式と月額
- サービス5工程：工程名・各項目の最終確認（現在は候補フレームで仮置き）
- 獲得コスト1/10の算出根拠・掲載可否
- 画面キャプチャ4枚：`assets/shots/` に `shot-ec-lp.png` / `shot-ad-report.png` / `shot-dashboard.png` / `shot-report.png` を置くと表示されます（未設置の間は COMING SOON 表示）
- 料金プラン：プラン名（ミニマル／アドバンス／上位プランの要否）・金額・内容
- フロー：初期構築・運用開始までの週数
- CTAボタンの遷移先（現在は `#contact` へのページ内リンク。フォームURL／メール／電話に差し替え）
- フッター：住所・TEL・Mail・代表者・設立・コーポレートサイトURL
- 事例セクション（CASE）：業種／before→after数値／コメント
- ロゴ：`assets/images/logo.svg` は仮ロゴです
- 公開時：`<head>` 内の og:url / og:image / canonical / JSON-LD の会社情報
