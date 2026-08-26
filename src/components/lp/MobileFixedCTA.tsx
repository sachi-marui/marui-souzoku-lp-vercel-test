import { company } from "@/data/company";
import { navCtaMobile } from "@/data/navigation";

export function MobileFixedCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] flex h-16 border-t border-border bg-white shadow-[0_-4px_16px_oklch(0.2_0.02_240/0.08)] lp-md:hidden">
      <a
        href={company.phoneHref}
        className="flex flex-1 items-center justify-center bg-bg-pale text-[15px] font-bold text-primary"
      >
        ☎ 電話相談
      </a>
      <a
        href={navCtaMobile.href}
        className="flex flex-1 items-center justify-center bg-accent text-[15px] font-bold text-white"
      >
        無料相談
      </a>
    </div>
  );
}
