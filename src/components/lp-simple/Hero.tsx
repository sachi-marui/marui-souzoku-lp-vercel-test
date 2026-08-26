"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";
import { company } from "@/data/company";

/**
 * Meta広告経由の流入を想定した簡易LP専用Hero。
 * 詳細版LP（src/components/lp/Hero.tsx）とは別コンポーネント。
 * コピー・CTAは固定のまま、右側の写真だけをゆっくりフェードで切り替える
 * （実家 → 土地 → 沖縄の街・海 → 実家…）。
 * モバイルは「ブランド→見出し→補足コピー→CTA」を写真より先に表示し、
 * ファーストビュー内でCTAまで到達できることを優先する。
 */

const SLIDES = [
  { src: "/images/hero-house.png", alt: "沖縄で相続した実家" },
  { src: "/images/hero-land.png", alt: "相続した土地" },
  { src: "/images/hero-landscape.png", alt: "沖縄の街並みと海" },
] as const;

const SLIDE_INTERVAL_MS = 5200;

const CLIP_RIGHT_CURVE_ID = "lp-simple-hero-right-curve";
const CLIP_RIGHT_CURVE_D = "M 0.10,0 C 0.02,0.30 0.02,0.70 0.10,1 L 1,1 L 1,0 Z";

/**
 * Hero専用の浅い2連波形（Worries=whiteへの接続用）。
 * OrganicDivider（大きな1本の円弧）ではなく、
 * 振幅±10程度・左右非対称にならない2周期のうねりをここだけで実装する。
 */
const HERO_WAVE_D =
  "M0,36 Q180,26 360,36 Q540,46 720,36 Q900,26 1080,36 Q1260,46 1440,36 L1440,60 L0,60 Z";

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg-pale">
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id={CLIP_RIGHT_CURVE_ID} clipPathUnits="objectBoundingBox">
            <path d={CLIP_RIGHT_CURVE_D} />
          </clipPath>
        </defs>
      </svg>

      <div className="flex flex-col lp-md:min-h-[70vh] lp-md:flex-row">
        {/* TEXT: ブランド表記＋見出し＋補足コピー＋CTA（モバイルでは写真より先に表示） */}
        <div className="order-1 flex flex-col justify-center px-6 pt-8 pb-9 lp-md:order-1 lp-md:flex-1 lp-md:px-[clamp(28px,6vw,64px)] lp-md:py-16">
          <div className="mx-auto flex w-full max-w-[480px] flex-col gap-5 lp-md:mx-0">
            <div className="flex items-center gap-[10px]">
              <span
                className="block h-[1.5px] w-[26px] bg-primary-dark"
                aria-hidden="true"
              />
              <span
                className="text-[12px] font-semibold tracking-[0.18em] text-primary-dark"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                {company.name}
              </span>
            </div>

            <h1
              className="m-0 text-[clamp(25px,6.6vw,38px)] font-semibold leading-[1.5] tracking-[0.02em] text-text-dark"
              style={{ fontFamily: "var(--font-shippori-mincho), serif" }}
            >
              <span className="block">沖縄で相続した実家や土地。</span>
              <span className="mt-1 block text-[clamp(20px,5vw,28px)] font-medium leading-[1.6] tracking-normal text-pretty text-primary">
                考え方は、
                <br />
                ひとつではありません。
              </span>
            </h1>

            <p
              className="m-0 text-[15px] leading-[1.9] tracking-[0.02em] text-text-mid"
              style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
            >
              売る・残す・活用する。
              <br />
              今の状況に合わせて、一緒に整理していきます。
            </p>

            <div className="mt-1">
              <CTAButton href="#contact" className="w-full lp-md:w-auto">
                選択肢を相談する
              </CTAButton>
            </div>
          </div>
        </div>

        {/* PHOTO: ゆっくりフェードで実家→土地→沖縄の街・海を巡回。モバイルはCTAの後に控えめな高さで表示 */}
        <div className="order-2 relative h-[clamp(160px,40vw,240px)] shrink-0 overflow-hidden rounded-t-[32px] lp-md:order-2 lp-md:h-auto lp-md:flex-[1.1] lp-md:self-stretch lp-md:rounded-none lp-md:[clip-path:url(#lp-simple-hero-right-curve)]">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 900px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Worriesセクション（white）へ浅い2連波形でつなぐ（OrganicDividerは使わずHero専用実装） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34px] overflow-hidden lp-md:h-[52px]"
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path d={HERO_WAVE_D} fill="var(--color-bg-white)" />
        </svg>
      </div>
    </section>
  );
}
