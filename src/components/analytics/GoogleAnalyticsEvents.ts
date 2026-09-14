import { sendGAEvent } from "@next/third-parties/google";

/**
 * GA4カスタムイベント送信ヘルパー。
 *
 * GA4基本タグは src/app/layout.tsx の <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> のみを
 * 使用しており（@next/third-parties/google）、ここではその実装が提供する sendGAEvent() を
 * 呼び出すだけで、GAタグやdataLayerの初期化を新たに行うことはしない
 * （二重読み込み・二重初期化を避けるため）。
 *
 * 各関数は onClick ハンドラから1回呼ばれることを想定しており、
 * 1クリック = 1回のイベント発火となる（呼び出し側で重複制御は不要）。
 */

/** 相続LP内でCTAが設置されているセクション。 */
export type CtaEventLocation = "final_cta" | "company_overview";

/** 問い合わせにつながる主要な連絡手段。 */
export type ContactMethod = "tel" | "line" | "form";

/**
 * 電話・LINE・問い合わせフォームリンクのクリック時に、独自イベント「contact_click」を
 * 発火する。
 *
 * GA4推奨イベント「generate_lead」は、Google公式の定義上「問い合わせフォームや情報を
 * 実際に送信したとき」に使うものであり、電話・LINE・フォームリンクのクリックはまだ
 * 問い合わせ完了ではないため使用しない。ここでは「問い合わせ導線をクリックした」という
 * 意向（インテント）のみを計測する。
 *
 * 将来、フォーム送信完了など実際の問い合わせ完了を正確に取得できるようになった時点で、
 * 別途 generate_lead を実装する想定。
 *
 * method / event_location パラメータで、手段（tel/line/form）とCTA掲載場所を区別する。
 */
export function trackContactClick(
  method: ContactMethod,
  eventLocation: CtaEventLocation,
) {
  sendGAEvent("event", "contact_click", {
    method,
    event_location: eventLocation,
  });
}

/** ヒーローCTA・中間CTAなど、#contactへのアンカースクロールを起点とするCTAの設置位置。 */
export type CtaScrollPosition = "hero" | "middle";

/**
 * ヒーローCTA・中間CTAなど、まだ問い合わせ手段（電話/LINE/フォーム）を選ぶ前の
 * 「相談CTAを押してFinalCTAまで進もうとした」意向のみを計測する補助イベント。
 *
 * contact_click（問い合わせ導線クリック）・generate_lead（問い合わせ完了）とは
 * 別のイベント名（cta_scroll_click）で扱い、混同しない。
 *
 * cta_position でCTAの設置位置、destinationでスクロール先を区別する。
 */
export function trackCtaScrollClick(
  ctaPosition: CtaScrollPosition,
  destination: string,
) {
  sendGAEvent("event", "cta_scroll_click", {
    cta_position: ctaPosition,
    destination,
  });
}
