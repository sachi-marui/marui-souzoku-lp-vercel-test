import { CTAButton } from "@/components/ui/CTAButton";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { OrganicDivider } from "@/components/ui/OrganicDivider";
import { company } from "@/data/company";

const tags = ["相談無料", "相続前でも相談OK", "売却を決めていなくても大丈夫です"];

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-24 pb-14 lp-md:min-h-[70vh] lp-md:pt-36 lp-md:pb-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <ImagePlaceholder
          label="沖縄の朝の海 または 宜野湾マリーナ"
          fill
          rounded={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.3 0.04 235 / 0.1), oklch(0.99 0.002 240 / 0.9))",
          }}
        />
      </div>

      {/*
        幸築サポーターズ→最終CTAの継ぎ目。
        最終CTAは写真＋グラデーションで単色背景を持たないため、
        前セクション（幸築サポーターズ）と全く同じ色（var(--color-bg-pale)）で
        最終CTA自身の最上部を覆い、曲線の分だけ自身の背景を見せる形にする。
        こうすることでセクション境界そのものは色が完全一致し、水平の継ぎ目が生じない。
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70px] overflow-hidden lp-md:h-[130px]"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,0 L1440,0 L1440,50 C950,10 550,110 0,55 Z"
            fill="var(--color-bg-pale)"
          />
        </svg>
      </div>

      <div className="relative z-[2] mx-auto max-w-[640px] px-6 text-center">
        <h2 className="mb-[18px] text-[clamp(26px,5.6vw,38px)] font-black leading-[1.45] text-text-dark">
          今すぐ売却を決める
          <br />
          必要はありません。
        </h2>
        <p className="mb-[30px] text-[15.5px] leading-[1.9] text-text-mid">
          まずは、今の状況を一緒に整理することから
          <br />
          始めませんか？
        </p>
        <div className="mb-[22px] flex flex-col justify-center gap-[14px] lp-md:flex-row">
          <CTAButton href={company.phoneHref}>無料相談する</CTAButton>
          <CTAButton variant="secondary" href={company.lineUrl}>
            LINEで相談する
          </CTAButton>
        </div>
        <a
          href={company.phoneHref}
          className="mb-[18px] block text-2xl font-black text-primary-dark"
        >
          ☎ {company.phoneDisplay}
        </a>
        <div className="flex flex-wrap justify-center gap-[10px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-bg-white px-4 py-[7px] text-xs font-semibold text-primary-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <OrganicDivider variant="c" color="var(--color-bg-pale)" />
    </section>
  );
}
