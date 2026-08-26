import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** 本文用の狭いコンテナ（max-width: 760px） */
  narrow?: boolean;
  className?: string;
};

export function Container({
  children,
  narrow = false,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 lp-md:px-10 ${
        narrow ? "max-w-[760px]" : "max-w-[1120px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
