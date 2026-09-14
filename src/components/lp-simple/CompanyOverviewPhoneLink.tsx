"use client";

import type { ReactNode } from "react";
import { trackMetaContact } from "@/components/analytics/MetaPixel";
import { trackContactClick } from "@/components/analytics/GoogleAnalyticsEvents";

type CompanyOverviewPhoneLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * 会社概要セクション内の電話番号リンク専用のクリック計測ラッパー。
 *
 * CompanyOverview自体は静的なサーバーコンポーネントのため、onClickハンドラ
 * （Meta Pixel Contact / GA4 contact_click）が必要なこの1リンクだけを
 * 最小限のクライアントコンポーネントとして切り出している。見た目・マークアップは
 * 元の <a> と同一で、挙動（クリック計測）のみを追加する。
 *
 * FinalCTAの電話リンクと同じ「電話タップ」という行動のため、
 * 計測内容もFinalCTAの電話リンクと揃える
 * （Meta: Contact / GA4: contact_click, method="tel"）。
 */
export function CompanyOverviewPhoneLink({
  href,
  className,
  children,
}: CompanyOverviewPhoneLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        trackMetaContact();
        trackContactClick("tel", "company_overview");
      }}
    >
      {children}
    </a>
  );
}
