"use client";

import type { ReactNode } from "react";
import { trackCtaScrollClick } from "@/components/analytics/GoogleAnalyticsEvents";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 簡易LP専用「選択肢を整理する」セクション（Ver.2 ④）。
 * 詳細版LP（src/components/lp/AssetOptions.tsx, Reasons.tsx）とは別コンポーネント。
 * 見出し・導入文はCompanyApproach.tsx（③）とは別に、このセクション固有のものを持つ。
 * 分類軸を「方法」で揃え（残す・活用する・売却する）、軍用地はカード化せず補足で扱う。
 *
 * 各カードのアイコンは、既存デザインシステムに専用のアイコン実装がなかったため、
 * 新規パッケージ・画像ファイルを追加せず軽量なインラインSVGで表現している。
 */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 「残す・管理する」= 家をイメージするシンプルな線画アイコン。 */
function HouseIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <polyline points="4 11 12 4 20 11" />
      <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      <rect x="10" y="14" width="4" height="6" />
    </svg>
  );
}

/** 「活用する」= 育てる・可能性をイメージする芽（スプラウト）の線画アイコン。 */
function GrowthIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <path d="M12 21V11" />
      <path d="M12 11C12 11 7 11 7 6.5C7 6.5 12 6.5 12 11Z" />
      <path d="M12 11C12 11 17 11 17 6.5C17 6.5 12 6.5 12 11Z" />
    </svg>
  );
}

/** 「売却する」= 取引・値付けをイメージするタグの線画アイコン。 */
function TagIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <path d="M12 3h6a2 2 0 0 1 2 2v6L11 20l-8-8L12 3Z" />
      <circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const choices: Array<{
  num: string;
  en: string;
  title: string;
  desc: string;
  icon: ReactNode;
}> = [
  {
    num: "01",
    en: "KEEP",
    title: "残す・管理する",
    desc: "すぐに売却せず、実家や土地を残しながら管理していく方法を考えます。",
    icon: <HouseIcon />,
  },
  {
    num: "02",
    en: "USE",
    title: "活用する",
    desc: "土地や実家の状況に合わせて、活用できる方法を整理します。",
    icon: <GrowthIcon />,
  },
  {
    num: "03",
    en: "SELL",
    title: "売却する",
    desc: "今の価値や状況を確認し、必要に応じて売却を検討します。",
    icon: <TagIcon />,
  },
];

const flowSteps = ["今の状況を整理", "選択肢を比較", "自分に合った方法を考える"];

export function AssetChoices() {
  return (
    <Section
      bg="pale"
      dividerBottom={{ variant: "c", color: "var(--color-bg-white)" }}
    >
      <div className="relative overflow-hidden">
        {/* 背景装飾: 見出し左側、セクション内に収まる淡い輪郭円（PCのみ） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 left-8 hidden h-[190px] w-[190px] rounded-full border border-primary/12 lp-md:block"
        />

        <Container>
          <SectionHeading>選択肢を整理する</SectionHeading>
          <p className="mx-auto mb-12 max-w-[560px] text-center text-[15px] leading-[1.9] text-text-mid">
            残す・活用する・売却する。今の状況に合う方法を一緒に考えます。
          </p>

          <div className="grid grid-cols-1 gap-4 lp-md:grid-cols-3 lp-md:gap-6">
            {choices.map((choice) => (
              <div
                key={choice.num}
                className="rounded-card border border-border bg-bg-white px-7 py-8"
              >
                <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {choice.icon}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-bold tracking-[0.1em] text-primary">
                    {choice.num}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.14em] text-primary/40">
                    {choice.en}
                  </span>
                </div>
                <p className="mt-2 mb-2 text-[20px] font-bold text-primary-dark">
                  {choice.title}
                </p>
                <p className="text-[14.5px] leading-[1.8] text-text-mid">
                  {choice.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[13.5px] font-medium text-text-mid">
            軍用地を相続された場合のご相談にも対応しています。
          </p>

          <div className="relative mt-12">
            {/* 背景装飾: ミニフローの3ステップがつながっている印象を作る淡い楕円（PCのみ） */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-1/2 hidden h-[64px] -translate-y-1/2 rounded-full lp-md:block"
              style={{ background: "oklch(0.58 0.16 240 / 0.05)" }}
            />
            <div className="relative flex flex-col items-center gap-2 lp-md:flex-row lp-md:justify-center lp-md:gap-4">
              {flowSteps.map((step, i) => (
                <div
                  key={step}
                  className="flex flex-col items-center gap-2 lp-md:flex-row lp-md:gap-4"
                >
                  <span className="rounded-full border border-primary/30 bg-bg-white px-5 py-2 text-[13.5px] font-semibold text-primary-dark">
                    {step}
                  </span>
                  {i < flowSteps.length - 1 && (
                    <span aria-hidden="true" className="text-primary/50">
                      <span className="lp-md:hidden">↓</span>
                      <span className="hidden lp-md:inline">→</span>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <CTAButton
              href="#contact"
              onClick={() => trackCtaScrollClick("middle", "contact")}
              className="w-full lp-md:w-auto"
            >
              無料相談して選択肢を知る
            </CTAButton>
          </div>
        </Container>
      </div>
    </Section>
  );
}
