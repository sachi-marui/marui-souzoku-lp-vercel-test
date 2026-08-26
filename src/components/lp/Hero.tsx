"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { company } from "@/data/company";
import { navCtaDesktop } from "@/data/navigation";

/**
 * Claude Design「Marui Hero.dc.html」の3種のclipPath curveを移植。
 * - LEFT_CURVE: PC版・写真右カラムの左端を切る大きな有機カーブ
 * - BOTTOM_CURVE_MOBILE: モバイル版・写真ブロック下端を切るカーブ（従来Heroの手法を踏襲）
 * - BOTTOM_CURVE_DESKTOP: PC版・Hero全体下端を切るごく浅いカーブ
 * いずれもobjectBoundingBox指定のため要素サイズに関わらずレスポンシブに追従する。
 */
const CLIP_LEFT_CURVE_ID = "hero-left-curve-desktop";
const CLIP_LEFT_CURVE_D = "M 0.10,0 C 0.02,0.30 0.02,0.70 0.10,1 L 1,1 L 1,0 Z";
const CLIP_BOTTOM_MOBILE_ID = "hero-bottom-curve-mobile";
const CLIP_BOTTOM_MOBILE_D = "M0,0 L1,0 L1,0.94 C0.74,0.995 0.34,0.925 0,0.97 Z";
const CLIP_BOTTOM_DESKTOP_ID = "hero-bottom-curve-desktop";
const CLIP_BOTTOM_DESKTOP_D = "M 0,0 L 1,0 L 1,1 C 0.62,0.975 0.30,0.99 0,0.955 Z";

const SLIDES = [
  { n: "01", src: "/images/hero-house.png", alt: "沖縄で相続した実家", label: "沖縄で相続した実家" },
  { n: "02", src: "/images/hero-land.png", alt: "相続した土地・空き地", label: "相続した土地・空き地" },
  { n: "03", src: "/images/hero-landscape.png", alt: "活用方法に迷う土地", label: "活用方法に迷う土地" },
] as const;

const SLIDE_INTERVAL_MS = 4400;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden bg-bg-pale lp-md:min-h-[86vh] lp-md:flex-row lp-md:[clip-path:url(#hero-bottom-curve-desktop)]">
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id={CLIP_LEFT_CURVE_ID} clipPathUnits="objectBoundingBox">
            <path d={CLIP_LEFT_CURVE_D} />
          </clipPath>
          <clipPath id={CLIP_BOTTOM_MOBILE_ID} clipPathUnits="objectBoundingBox">
            <path d={CLIP_BOTTOM_MOBILE_D} />
          </clipPath>
          <clipPath id={CLIP_BOTTOM_DESKTOP_ID} clipPathUnits="objectBoundingBox">
            <path d={CLIP_BOTTOM_DESKTOP_D} />
          </clipPath>
        </defs>
      </svg>

      {/* 縦書きブランドラベル（PCのみ・左端） */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[10px] z-[5] hidden w-4 items-center justify-center lp-md:flex"
      >
        <span
          className="text-[11px] font-medium tracking-[0.28em] text-primary-dark/70"
          style={{
            writingMode: "vertical-rl",
            fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif",
          }}
        >
          OKINAWA / GINOWAN
        </span>
      </div>

      {/* MOBILE ONLY: ブランドラベル＋H1（写真より先に表示。PCでは非表示、内容はLEFT側と重複表示） */}
      <div className="order-1 px-6 pb-5 pt-8 lp-md:hidden">
        <div className="mx-auto flex w-full max-w-[520px] flex-col gap-6" style={{ containerType: "inline-size" }}>
          <div className="flex items-center gap-[10px]">
            <span className="block h-[1.5px] w-[26px] bg-primary-dark" aria-hidden="true" />
            <span
              className="text-[13px] font-semibold tracking-[0.18em] text-primary-dark"
              style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
            >
              丸伊不動産　相続 × 軍用地
            </span>
          </div>

          <h1
            className="m-0 text-[clamp(24px,9cqw,46px)] font-semibold tracking-[0.03em] text-text-dark"
            style={{ fontFamily: "var(--font-shippori-mincho), serif" }}
          >
            <span className="block whitespace-nowrap leading-[1.55]">沖縄で相続した</span>
            <span className="mt-[2px] block whitespace-nowrap leading-[1.55]">実家・土地・軍用地。</span>
            <span className="mt-[2px] block whitespace-nowrap leading-[1.55] text-primary">後悔しない選択を。</span>
          </h1>
        </div>
      </div>

      {/* LEFT: コピー・本文・CTA（PC専用のブランドラベル＋H1を内包。モバイルでは写真の後に表示） */}
      <div className="relative z-[2] order-3 flex flex-1 flex-col justify-center px-6 pb-10 pt-5 lp-md:order-1 lp-md:min-w-[300px] lp-md:flex-[1_1_300px] lp-md:px-[clamp(28px,6vw,64px)] lp-md:py-0 lp-md:pl-[clamp(36px,6vw,60px)]">
        <div
          className="mx-auto flex w-full max-w-[520px] flex-col gap-6 lp-md:mx-0"
          style={{ containerType: "inline-size" }}
        >
          <div className="hidden lp-md:contents">
            <div className="flex items-center gap-[10px]">
              <span className="block h-[1.5px] w-[26px] bg-primary-dark" aria-hidden="true" />
              <span
                className="text-[13px] font-semibold tracking-[0.18em] text-primary-dark"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                丸伊不動産　相続 × 軍用地
              </span>
            </div>

            <h1
              className="m-0 text-[clamp(24px,9cqw,46px)] font-semibold tracking-[0.03em] text-text-dark"
              style={{ fontFamily: "var(--font-shippori-mincho), serif" }}
            >
              <span className="block whitespace-nowrap leading-[1.55]">沖縄で相続した</span>
              <span className="mt-[2px] block whitespace-nowrap leading-[1.55]">実家・土地・軍用地。</span>
              <span className="mt-[2px] block whitespace-nowrap leading-[1.55] text-primary">後悔しない選択を。</span>
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col gap-[5px] text-[15px] font-medium tracking-[0.06em] text-text-dark"
              style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
            >
              <span>売却するか。</span>
              <span>残すか。</span>
              <span>活用するか。</span>
            </div>
            <p
              className="m-0 text-[15px] font-normal leading-[1.95] tracking-[0.02em] text-text-mid"
              style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
            >
              まずは今の状況を、
              <br />
              一緒に整理しませんか。
            </p>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={navCtaDesktop.href}
              className="inline-flex h-[52px] items-center justify-center rounded-[9px] bg-accent px-9 text-[15px] font-bold tracking-[0.08em] text-white transition duration-200 hover:bg-accent-dark"
              style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
            >
              無料相談する
            </a>
            <div className="flex gap-6">
              <a
                href={company.phoneHref}
                className="inline-flex h-[52px] items-center border-b border-primary-dark/55 text-[14px] font-semibold tracking-[0.06em] text-primary-dark"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                ☎ 電話で相談
              </a>
              <a
                href={company.lineUrl}
                className="inline-flex h-[52px] items-center border-b border-primary-dark/55 text-[14px] font-semibold tracking-[0.06em] text-primary-dark"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                LINEで相談
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 写真（左端を大きな有機カーブで切る／PC）／H1直後・横長固定高さ（モバイル） */}
      <div className="relative order-2 h-[clamp(180px,52vw,260px)] shrink-0 overflow-hidden lp-md:order-2 lp-md:h-auto lp-md:min-w-[300px] lp-md:flex-[1.4_1_420px] lp-md:self-stretch">
        <div
          className="absolute inset-0 [clip-path:url(#hero-bottom-curve-mobile)] lp-md:[clip-path:url(#hero-left-curve-desktop)]"
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 900px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* 写真右下の小ラベル（枚数と同期） */}
        <div className="absolute bottom-4 right-4 z-[3] h-[34px] w-[200px] rounded-[2px] bg-white/92 lp-md:bottom-9 lp-md:right-9 lp-md:h-[37px] lp-md:w-[210px]">
          {SLIDES.map((slide, i) => (
            <span
              key={slide.src}
              className="absolute inset-0 flex items-center gap-[9px] px-4 transition-opacity duration-500 ease-in-out"
              style={{ opacity: i === index ? 1 : 0 }}
              aria-hidden={i !== index}
            >
              <span
                className="text-[10px] font-semibold tracking-[0.04em] text-text-mid"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                {slide.n}
              </span>
              <span className="block h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
              <span
                className="whitespace-nowrap text-[12px] font-medium tracking-[0.08em] text-text-dark"
                style={{ fontFamily: "var(--font-zen-kaku-gothic-new), sans-serif" }}
              >
                {slide.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
