export type NavLink = {
  label: string;
  href: string;
};

/**
 * ヘッダーナビ（デスクトップ）・ハンバーガーメニュー（モバイル）共通のリンク一覧。
 * 「相談事例」「#cases」は削除済みセクションのため除外している。
 */
export const navLinks: NavLink[] = [
  { label: "相続相談", href: "#worry" },
  { label: "軍用地について", href: "#assets" },
  { label: "よくある質問", href: "#faq" },
];

/** デスクトップヘッダーのCTAボタン */
export const navCtaDesktop: NavLink = {
  label: "無料相談する",
  href: "#cta-main",
};

/** モバイルのハンバーガーメニュー内CTA項目 */
export const navCtaMobile: NavLink = {
  label: "無料相談",
  href: "#cta-main",
};
