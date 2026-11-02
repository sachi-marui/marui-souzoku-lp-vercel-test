import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import "./globals.css";

/** GA4測定ID（プロパティ「丸伊不動産」/ Webデータストリーム「相続」）。 */
const GA_MEASUREMENT_ID = "G-9JHSVD6L9G";

/**
 * フォントは、Google Fontsから直接配信する（自サイトのファイルとしては配らない）。
 * 日本語フォントは文字の範囲ごとに約120個のファイルに分かれており、1回の表示で数百件・約10MBになる。
 * 自サイトから配ると、Firebase Hostingの無料枠（1日360MB）を、少ない訪問数で使い切ってしまうため。
 *   Noto Sans JP（本文）            : 400 / 500 / 700 / 900
 *   Shippori Mincho（Heroの見出し） : 500 / 600 / 700
 *   Zen Kaku Gothic New（Heroの本文）: 400 / 500 / 700
 * フォントの種類・太さを変えるときは、この一覧とURLの両方を直す。
 */
const FONTS_CSS_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Shippori+Mincho:wght@500;600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap";

/**
 * 各部品が参照するCSS変数（名前は従来のまま）。Google Fontsに接続できない場合は、OSの日本語フォントで表示する。
 */
const fontVariables = {
  "--font-noto-sans-jp": '"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
  "--font-shippori-mincho": '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif',
  "--font-zen-kaku-gothic-new": '"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
} as CSSProperties;

export const metadata: Metadata = {
  metadataBase: new URL("https://souzoku.marui-ginowan.co.jp"),
  title: "丸伊不動産｜沖縄で相続した資産の無料相談",
  description:
    "沖縄で相続した実家・土地・軍用地の悩みを無料相談。売却だけでなく、残す・活用する選択肢も一緒に整理します。",
  verification: {
    google: "2mQIyKissbt2bTZ5ZomUsmNbzglsJx8vGkqT-7pPVwI",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className="h-full antialiased" style={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS_CSS_URL} />
      </head>
      <body className="min-h-full bg-bg-white text-text-dark">
        <MetaPixel />
        {children}
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
