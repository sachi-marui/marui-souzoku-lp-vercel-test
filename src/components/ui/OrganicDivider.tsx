export type OrganicDividerVariant = "a" | "b" | "c";

export type OrganicDividerProps = {
  /** カーブの形状パターン（a/b/cの3種を使い回す） */
  variant: OrganicDividerVariant;
  /** 次セクションの背景色。この色でカーブを塗り、前セクションへ重ねて自然につなげる */
  color: string;
};

/**
 * A: 左がやや高く（＝浮き込みが深く）、右へ向かって浅くなる
 * B: 中央がゆるく膨らむ
 * C: 右がやや高く、左へ向かって浅くなる（Aの鏡像）
 * viewBoxを固定し preserveAspectRatio="none" で全幅に引き伸ばすため、
 * 実際の幅に関わらず同じ弧の比率を保って安定する。
 */
const VARIANT_PATHS: Record<OrganicDividerVariant, string> = {
  a: "M0,25 C400,55 900,70 1440,55 L1440,100 L0,100 Z",
  b: "M0,70 C480,20 960,20 1440,70 L1440,100 L0,100 Z",
  c: "M0,55 C540,70 1040,55 1440,25 L1440,100 L0,100 Z",
};

/**
 * セクション下端に配置する、次セクション背景色の有機的なカーブ。
 * 高さのみPC/スマホで変え、同じパスを再利用することで
 * スマホでは相対的に浅いカーブになる（形状は歪ませない）。
 */
export function OrganicDivider({ variant, color }: OrganicDividerProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[46px] overflow-hidden lp-md:h-[88px]"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path d={VARIANT_PATHS[variant]} fill={color} />
      </svg>
    </div>
  );
}
