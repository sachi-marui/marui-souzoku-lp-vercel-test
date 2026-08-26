type ImagePlaceholderProps = {
  /** 差し込むべき写真の内容を示す説明文（そのまま将来の alt テキストの元になる） */
  label: string;
  /** 例: "4/3", "1/1", "16/9"（fill=true の場合は無視される） */
  aspectRatio?: string;
  rounded?: boolean;
  /** 親要素（position: relative）いっぱいに絶対配置で敷き詰める（Hero等のフルブリード用） */
  fill?: boolean;
  className?: string;
};

/**
 * 実写真が揃うまでの仮置きコンポーネント。
 * 本番では各利用箇所をこのコンポーネントごと next/image に差し替える想定。
 * label の文言がそのまま「必要な写真の説明」= alt文言の元になる。
 */
export function ImagePlaceholder({
  label,
  aspectRatio = "4/3",
  rounded = true,
  fill = false,
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden border border-dashed border-border bg-bg-gray text-center text-sm text-text-mid ${
        rounded ? "rounded-card" : ""
      } ${fill ? "absolute inset-0 h-full w-full" : "w-full"} ${className}`}
      style={fill ? undefined : { aspectRatio }}
    >
      <span className="px-4">{label}</span>
    </div>
  );
}
