import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import MetaPixel from "@/components/analytics/MetaPixel";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

/** Hero専用の見出しセリフ体（他セクションのフォントには影響しない） */
const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/** Hero専用の本文ゴシック体（他セクションのフォントには影響しない） */
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "丸伊不動産｜沖縄で相続した資産の無料相談",
  description:
    "沖縄で相続した実家・土地・軍用地の悩みを無料相談。売却だけでなく、残す・活用する選択肢も一緒に整理します。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable} ${zenKakuGothicNew.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-white text-text-dark">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
