"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

/**
 * Meta広告マネージャ データセット「丸伊不動産｜相続LP」のPixel ID。
 * 今後CTAクリック等のコンバージョンイベントを追加する際もこの定数を再利用する。
 */
export const META_PIXEL_ID = "1977535962958369";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * 問い合わせにつながる主要CTA（電話・LINE・問い合わせフォーム）のクリック時に
 * Metaの標準イベント「Contact」を発火する。onClickハンドラから呼ぶことを想定しており、
 * 1クリック = 1回のイベント発火となる（呼び出し側で重複制御は不要）。
 */
export function trackMetaContact() {
  if (typeof window.fbq === "function") {
    window.fbq("track", "Contact");
  }
}

/**
 * App Routerのクライアントサイド遷移（next/linkによるソフトナビゲーション）は
 * フルページロードを伴わないため、ベースコードのfbq('track','PageView')は
 * 初回ロード分しか発火しない。pathname変化を監視して以降のPageViewを補う。
 * 初回マウント分はベースコードが既に発火済みのためrefでスキップする。
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="meta-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
`,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
