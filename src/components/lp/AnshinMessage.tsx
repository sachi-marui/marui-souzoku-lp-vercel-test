import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const ANSHIN_PHOTO_SRC = "/images/consultation-dummy.png";

/**
 * 写真を柔らかい非対称blob状にマスクするためのclipPath。
 * objectBoundingBox指定のため、要素サイズに関わらず安定してレスポンシブに追従する。
 */
const PHOTO_CLIP_PATH_ID = "anshin-photo-blob";
const PHOTO_CLIP_PATH_D =
  "M0.18,0.02 C0.42,-0.04 0.72,0.00 0.88,0.14 C1.03,0.27 0.99,0.46 0.96,0.60 " +
  "C0.93,0.75 0.92,0.88 0.76,0.96 C0.60,1.04 0.38,1.00 0.24,0.92 " +
  "C0.09,0.84 0.01,0.68 0.02,0.52 C0.03,0.36 -0.02,0.22 0.05,0.13 C0.08,0.08 0.12,0.05 0.18,0.02 Z";

export function AnshinMessage() {
  return (
    <Section bg="white">
      {/*
        Hero→安心メッセージの継ぎ目：淡いブルーの帯。
        Sectionのpaddingに関わらずセクション上端（＝Hero下端との境界）へ
        密着させるため、下のoverflow-hiddenラッパーの外側（Sectionの直接の子）に配置する。
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[50px] lp-md:h-[90px]"
      >
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0,0 L1440,0 L1440,18 C1000,52 520,68 0,32 Z"
            fill="oklch(0.9 0.035 235 / 0.55)"
          />
          <path
            d="M0,0 L1440,0 L1440,10 C1050,30 480,42 0,15 Z"
            fill="oklch(0.58 0.16 240 / 0.08)"
          />
        </svg>
      </div>

      <div className="relative overflow-hidden">
        {/* セクション背景の有機的なシェイプ（装飾のみ・淡いブルー系） */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-24 -z-10 h-[380px] w-[380px]"
          style={{
            background: "oklch(0.965 0.016 235 / 0.75)",
            borderRadius: "44% 56% 62% 38% / 46% 40% 60% 54%",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -bottom-20 -z-10 h-[300px] w-[300px]"
          style={{
            background: "oklch(0.9 0.035 235 / 0.5)",
            borderRadius: "58% 42% 40% 60% / 55% 60% 40% 45%",
          }}
        />

        <Container>
          <div className="flex flex-col items-center gap-10 lp-md:flex-row lp-md:gap-20">
            <div className="relative w-full min-w-0 flex-1">
              {/* 植物の線画（モンステラ／南国植物イメージ・ミニマル・極薄・装飾のみ） */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 260"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary pointer-events-none absolute -bottom-10 -left-8 hidden h-44 w-36 opacity-[0.13] lp-md:block"
              >
                <path d="M100 10 C 40 40, 20 110, 45 170 C 60 205, 90 235, 100 250 C 110 235, 140 205, 155 170 C 180 110, 160 40, 100 10 Z" />
                <path d="M100 30 L100 235" />
                <path d="M100 70 C 80 85, 70 100, 65 115" />
                <path d="M100 70 C 120 85, 130 100, 135 115" />
                <path d="M100 120 C 78 138, 66 155, 60 170" />
                <path d="M100 120 C 122 138, 134 155, 140 170" />
              </svg>

              {/* 写真背後の抽象シェイプ（半透明・主張しすぎない） */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-5 -left-4 h-[92%] w-[92%] lp-md:-top-6 lp-md:-left-6"
                style={{
                  background: "oklch(0.58 0.16 240 / 0.14)",
                  borderRadius: "58% 42% 39% 61% / 44% 55% 45% 56%",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-4 h-[68%] w-[68%] lp-md:-right-5 lp-md:-bottom-6"
                style={{
                  background: "oklch(0.965 0.016 235 / 0.9)",
                  borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%",
                }}
              />

              {/* 写真本体：blob状にマスク */}
              <svg width="0" height="0" aria-hidden="true" className="absolute">
                <defs>
                  <clipPath id={PHOTO_CLIP_PATH_ID} clipPathUnits="objectBoundingBox">
                    <path d={PHOTO_CLIP_PATH_D} />
                  </clipPath>
                </defs>
              </svg>
              <div
                className="relative w-full [aspect-ratio:4/3]"
                style={{ clipPath: `url(#${PHOTO_CLIP_PATH_ID})` }}
              >
                <Image
                  src={ANSHIN_PHOTO_SRC}
                  alt="スタッフが自然光の中で相談に乗っている様子"
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: "70% 30%" }}
                />
              </div>
            </div>

            <div className="w-full min-w-0 flex-1">
              <div className="mb-2.5 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-[2px] w-6 rounded-full bg-primary"
                />
                <span
                  aria-hidden="true"
                  className="h-[5px] w-[5px] rounded-full bg-accent"
                />
                <p className="text-[13px] font-bold tracking-[0.12em] text-primary">
                  ご相談前に、まず知っていただきたいこと
                </p>
              </div>
              <h2 className="mb-5 text-h2 font-bold tracking-[0.01em] text-text-dark">
                まだ売ると決めていなくても、
                <br />
                大丈夫です。
              </h2>
              <p className="mb-4 text-base leading-loose text-text-mid">
                丸伊不動産は、売却だけを勧める不動産会社ではありません。
              </p>
              <p className="mb-4 text-base leading-loose text-text-mid">
                実家を残す。土地を活用する。軍用地を保有する。売却する。
                <br />
                今の状況に合った選択肢を、一緒に整理します。
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
