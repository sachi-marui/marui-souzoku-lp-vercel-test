import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  children,
  eyebrow,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-[680px] text-center" : ""}>
      {eyebrow && (
        <p className="mb-2.5 text-[13px] font-bold tracking-[0.12em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-h2 font-bold tracking-[0.01em] text-text-dark ${
          isCenter ? "mb-10" : "mb-5"
        } ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}
