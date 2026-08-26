import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 簡易LP専用「こんなお悩みありませんか？」セクション。
 * 詳細版LP（src/components/lp/Worries.tsx）とは別コンポーネント。
 * 画像なし・単一縦リストのみで、広告流入者が数秒でテンポよく読める構成にする。
 */

const worries = [
  "相続した実家、このまま残すか売るか迷っている",
  "土地を相続したけれど、どう活用できるのか分からない",
  "県外に住んでいて、沖縄の実家や土地の管理が難しい",
  "家族でこれからのことを、まだ整理できていない",
  "何から考えればいいのか分からず、そのままになっている",
];

export function Worries() {
  return (
    <Section
      bg="white"
      dividerBottom={{ variant: "a", color: "var(--color-bg-pale)" }}
    >
      <div className="relative overflow-hidden">
        {/* 背景装飾: セクション内に収まる輪郭円＋淡いblob（PCのみ） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-8 right-8 hidden h-[220px] w-[220px] rounded-full border border-primary/15 lp-md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-8 hidden h-[130px] w-[130px] lp-md:block"
          style={{
            background: "oklch(0.58 0.16 240 / 0.06)",
            borderRadius: "58% 42% 39% 61% / 44% 55% 45% 56%",
          }}
        />

        <Container narrow>
          <SectionHeading>こんなお悩みありませんか？</SectionHeading>
          <div className="flex flex-col">
            {worries.map((worry) => (
              <div
                key={worry}
                className="flex items-start gap-3.5 border-b border-border py-[18px]"
              >
                <span className="mt-px shrink-0 text-[18px] font-bold text-primary">
                  ✓
                </span>
                <span className="text-base leading-[1.7] text-text-dark">
                  {worry}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
