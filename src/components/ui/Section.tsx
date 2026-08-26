import type { ReactNode } from "react";
import {
  OrganicDivider,
  type OrganicDividerProps,
} from "@/components/ui/OrganicDivider";

type SectionProps = {
  children: ReactNode;
  id?: string;
  bg?: "white" | "pale" | "gray";
  className?: string;
  /** セクション下端に、次セクションの背景色で有機的なカーブを重ねて自然につなげる */
  dividerBottom?: OrganicDividerProps;
};

const bgClass = {
  white: "bg-bg-white",
  pale: "bg-bg-pale",
  gray: "bg-bg-gray",
} as const;

export function Section({
  children,
  id,
  bg = "white",
  className = "",
  dividerBottom,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${bgClass[bg]} py-[clamp(56px,9vw,112px)] ${className}`}
    >
      {children}
      {dividerBottom && <OrganicDivider {...dividerBottom} />}
    </section>
  );
}
