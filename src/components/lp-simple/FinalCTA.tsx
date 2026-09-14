"use client";

import { trackMetaContact } from "@/components/analytics/MetaPixel";
import { trackContactClick } from "@/components/analytics/GoogleAnalyticsEvents";
import { CTAButton } from "@/components/ui/CTAButton";
import { OrganicDivider } from "@/components/ui/OrganicDivider";
import { company } from "@/data/company";

/**
 * 簡易LP専用「最終CTA」セクション。
 * 詳細版LP（src/components/lp/FinalCTA.tsx）とは別コンポーネント。
 * 簡易LP内で最も強いCTAとして扱う。HeroとAssetChoicesの href="#contact" は
 * このセクションのid="contact"へスクロールする。
 *
 * 問い合わせ導線の優先順位（電話→LINE→フォーム）は、
 * 詳細版LPのFinalCTA/Header/MobileFixedCTAが一貫して電話を主CTAに置いている
 * 既存のブランド運用に合わせている。
 *
 * フォームCTAは、company.contactUrl（現時点で"#"の未確定プレースホルダー）ではなく、
 * 丸伊不動産の既存お問い合わせフォーム（別ドメイン）へ直接リンクしている。
 *
 * 背景は白。オレンジのメインCTAを最も目立たせ、明るく相談しやすい印象にする。
 */

const CONTACT_FORM_URL = "https://www.marui-ginowan.co.jp/contact/";

const reassuranceTags = [
  "相談無料",
  "まだ売却を決めていなくてもOK",
  "相続前でも相談OK",
];

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-bg-white">
      {/* 背景装飾: セクション内に収まる淡いblob（PCのみ）。CTAより目立たせない */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 left-8 hidden h-[160px] w-[160px] lp-md:block"
        style={{
          background: "oklch(0.58 0.16 240 / 0.05)",
          borderRadius: "55% 45% 60% 40% / 45% 55% 45% 55%",
        }}
      />

      <div className="relative mx-auto max-w-[560px] px-6 py-14 text-center lp-md:py-16">
        <h2 className="m-0 mb-4 text-[clamp(26px,5.6vw,36px)] font-black leading-[1.5] text-text-dark">
          まずは今の状況を
          <br />
          整理しませんか？
        </h2>
        <p className="m-0 mb-7 text-[15px] leading-[1.9] text-text-mid">
          まだ売ると決めていなくても大丈夫です。
          <br />
          相続した実家・土地・軍用地について、今の状況を整理するところからご相談いただけます。
        </p>

        <div className="mb-6 flex flex-col items-center gap-3 lp-md:flex-row lp-md:justify-center">
          <CTAButton
            href={company.phoneHref}
            onClick={() => {
              trackMetaContact();
              trackContactClick("tel", "final_cta");
            }}
            className="w-full whitespace-nowrap lp-md:w-auto"
          >
            ☎ 電話で無料相談する
          </CTAButton>
          <CTAButton
            href={company.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackMetaContact();
              trackContactClick("line", "final_cta");
            }}
            variant="secondary"
            className="w-full whitespace-nowrap lp-md:w-auto"
          >
            LINEで相談する
          </CTAButton>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackMetaContact();
              trackContactClick("form", "final_cta");
            }}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-primary/40 bg-white px-8 py-4 text-base font-bold text-primary/60 transition-colors duration-200 hover:border-primary/60 hover:bg-bg-pale lp-md:w-auto"
          >
            無料相談フォーム
          </a>
        </div>

        <a
          href={company.phoneHref}
          onClick={() => {
            trackMetaContact();
            trackContactClick("tel", "final_cta");
          }}
          className="mb-5 block text-2xl font-black text-primary-dark"
        >
          ☎ {company.phoneDisplay}
        </a>

        <div className="flex flex-wrap justify-center gap-[10px]">
          {reassuranceTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-bg-pale px-4 py-[7px] text-xs font-semibold text-primary-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 会社概要セクション（ブルー）へ緩やかな波でつなぐ */}
      <OrganicDivider variant="c" color="var(--color-primary)" />
    </section>
  );
}
