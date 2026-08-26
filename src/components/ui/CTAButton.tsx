import type { AnchorHTMLAttributes, ReactNode } from "react";

type CTAButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

/**
 * tel: / LINE / ページ内アンカーなど、すべて仮リンクの通常の <a> として扱う
 * （このLPは単一ページ構成のため next/link のクライアント遷移は不要）。
 */
export function CTAButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full text-base font-bold transition duration-200";
  const variantClass =
    variant === "primary"
      ? "bg-accent px-[34px] py-[17px] text-white shadow-cta hover:-translate-y-px hover:bg-accent-dark"
      : "border-[1.5px] border-primary bg-white px-8 py-4 text-primary hover:bg-bg-pale";

  return (
    <a className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </a>
  );
}
