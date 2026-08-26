import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/data/company";

/**
 * 簡易LP専用「会社概要」セクション。
 * 詳細版LP（src/components/lp/CompanyOverview.tsx）とは別コンポーネント。
 *
 * 表示項目は src/data/company.ts の既存データのみを使用し、推測や新規情報の追加はしない。
 * 広告LPの信頼性確認が目的のため、詳細版より項目数を絞っている
 * （FAX・代表者などは詳細版のみに残し、ここでは掲載しない）。
 * このセクションには新しいCTAを置かない（問い合わせ導線はFinalCTAに集約）。
 *
 * 背景はブルー系グラデーション（--color-primary → --color-primary-dark）のため、
 * Section（bg="white"|"pale"|"gray"のみ対応）は使わず、Hero/FinalCTAと同様に
 * 専用の<section>を組んでいる。
 *
 * マップは詳細版Footer.tsx（src/components/lp/Footer.tsx）と同じ
 * 「https://www.google.com/maps?q=<住所>&output=embed」形式（APIキー不要）を、
 * company.ts の実住所から生成して再利用している。座標・Place IDの新規作成はしていない。
 *
 * ロゴ3点はプロジェクトルートの images/（他の既存画像と同じ格納場所）から
 * public/images/ へコピーして使用している既存アセット。新規作成・加工はしていない。
 * logo-marui.png は透明背景に白色のロゴのため、白背景のカードには乗せず
 * セクション背景（ブルー）に直接配置している（白背景に乗せると視認できなくなるため）。
 * logo-lixil.png（オレンジ背景）・logo-souzoku-salon.jpg（白背景）は
 * 画像自体に背景を含むため、角を軽く丸める以外の追加装飾はしていない。
 */

const items: Array<{ label: string; value: ReactNode }> = [
  { label: "会社名", value: company.legalName },
  { label: "所在地", value: `〒${company.postalCode} ${company.address}` },
  {
    label: "電話番号",
    value: (
      <a
        href={company.phoneHref}
        className="font-semibold text-white underline decoration-white/40 underline-offset-2"
      >
        {company.phoneDisplay}
      </a>
    ),
  },
  { label: "営業時間", value: company.businessHours },
  { label: "定休日", value: company.closedDay },
  { label: "宅地建物取引業免許番号", value: company.licenseNumber },
];

const mapQuery = encodeURIComponent(
  `〒${company.postalCode} ${company.address}`,
);
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
const mapViewUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

const logos = [
  {
    src: "/images/logo-marui.png",
    alt: "丸伊不動産 ロゴ",
    width: 492,
    height: 473,
    className: "h-11 w-auto lp-md:h-14",
  },
  {
    src: "/images/logo-lixil.png",
    alt: "LIXIL不動産ショップ ロゴ",
    width: 299,
    height: 300,
    className: "h-9 w-auto rounded-md lp-md:h-11",
  },
  {
    src: "/images/logo-souzoku-salon.jpg",
    alt: "相続サロン ロゴ",
    width: 842,
    height: 842,
    className: "h-9 w-auto rounded-md lp-md:h-11",
  },
] as const;

export function CompanyOverview() {
  return (
    <section
      id="company-overview"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-primary), var(--color-primary-dark))",
      }}
    >
      <Container className="py-[clamp(56px,9vw,112px)]">
        <SectionHeading className="!text-white">会社概要</SectionHeading>

        <div className="mb-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-4 lp-md:mb-11">
          {logos.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className={logo.className}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lp-md:grid-cols-2 lp-md:items-stretch">
          {/* 会社情報カード */}
          <div className="rounded-card border border-white/25 bg-white/12 px-6 py-8 lp-md:px-8 lp-md:py-8">
            <dl className="grid grid-cols-1 gap-5">
              {items.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="text-[13px] font-bold text-white/75">
                    {item.label}
                  </dt>
                  <dd className="text-[15px] leading-relaxed text-white">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-white/20 pt-5">
              <span className="inline-block rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-white">
                {company.membershipBadge}
              </span>
            </div>
          </div>

          {/* マップカード */}
          <div className="overflow-hidden rounded-card border border-white/25 bg-white/12">
            <div className="h-[200px] w-full lp-md:h-full lp-md:min-h-[280px]">
              <iframe
                src={mapEmbedUrl}
                title={`${company.legalName} Googleマップ`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-3 text-center text-sm font-semibold text-white underline decoration-white/40 underline-offset-2"
            >
              Googleマップで所在地を見る
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
