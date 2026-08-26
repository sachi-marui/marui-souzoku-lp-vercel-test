import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 簡易LP専用「ご相談の流れ」セクション。
 * 詳細版LP（src/components/lp/ConsultationFlow.tsx、5ステップ）とは別コンポーネント。
 * 広告LPのため3ステップに絞り、「相談＝契約」ではないことが伝わる柔らかい印象にする。
 *
 * カードはAssetChoicesの純白カードと差別化するため、淡いブルー系背景（bg-primary/5）・
 * 控えめな枠線（border-primary/15）にしている。
 * アイコンは新規パッケージ・画像ファイルを追加せず軽量なインラインSVGで表現している。
 */

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 「お問い合わせ」= 封筒（連絡・問い合わせ）の線画アイコン。 */
function ContactIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

/** 「ヒアリング」= 吹き出し（会話・お話を聞く）の線画アイコン。 */
function HearingIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5V16H6a2 2 0 0 1-2-2V6Z" />
      <circle cx="8.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 「ご提案」= 書類とチェック（提案・選択肢の整理）の線画アイコン。 */
function ProposalIcon() {
  return (
    <svg {...iconProps} className="h-5 w-5" aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
}

const steps: Array<{
  num: string;
  title: string;
  desc: string;
  icon: ReactNode;
}> = [
  {
    num: "01",
    title: "お問い合わせ",
    desc: "電話・LINE・フォームなどからお気軽にご相談ください。",
    icon: <ContactIcon />,
  },
  {
    num: "02",
    title: "ヒアリング",
    desc: "相続した実家や土地の状況、ご家族のお考えなどをお聞きします。",
    icon: <HearingIcon />,
  },
  {
    num: "03",
    title: "ご提案",
    desc: "今の状況を整理したうえで、これからの選択肢を一緒に考えます。",
    icon: <ProposalIcon />,
  },
];

export function SimpleFlow() {
  return (
    <Section
      bg="pale"
      dividerBottom={{ variant: "a", color: "var(--color-bg-white)" }}
    >
      <Container>
        <SectionHeading>ご相談の流れ</SectionHeading>
        <p className="mx-auto mb-12 max-w-[480px] text-center text-[14.5px] leading-[1.9] text-text-mid">
          まずは今の状況をお聞かせください。
          <br />
          内容を整理したうえで、必要な選択肢をご案内します。
        </p>

        <div className="flex flex-col items-center gap-3 lp-md:flex-row lp-md:items-center lp-md:justify-center lp-md:gap-3">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="flex w-full max-w-[360px] flex-col items-center gap-3 lp-md:w-auto lp-md:max-w-none lp-md:flex-row lp-md:items-center lp-md:gap-3"
            >
              <div className="w-full flex-1 rounded-card border border-primary/15 bg-primary/5 px-7 py-8 text-center lp-md:min-w-[220px] lp-md:text-left">
                <div className="flex flex-col items-center lp-md:items-start">
                  <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg-white text-primary">
                    {step.icon}
                  </span>
                  <span className="relative inline-flex h-[68px] w-[68px] items-center justify-center lp-md:h-[72px] lp-md:w-[72px]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-primary/20"
                    />
                    <span className="relative text-[36px] font-black leading-none text-primary">
                      {step.num}
                    </span>
                  </span>
                </div>
                <p className="mt-3 mb-2 text-[18px] font-bold text-text-dark">
                  {step.title}
                </p>
                <p className="text-[14px] leading-[1.8] text-text-mid">
                  {step.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-bg-white text-[15px] font-bold text-primary/70"
                >
                  <span className="lp-md:hidden">↓</span>
                  <span className="hidden lp-md:inline">→</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
