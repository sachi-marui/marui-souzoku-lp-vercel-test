"use client";

import { useEffect, useState } from "react";
import { company } from "@/data/company";
import { navCtaDesktop, navCtaMobile, navLinks } from "@/data/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-[100] h-[58px] w-full border-b border-border bg-bg-white/92 backdrop-blur lp-md:h-[72px]">
      <div className="mx-auto flex h-full w-full max-w-[1280px] items-center justify-between px-5 lp-md:px-10">
        <a href="#" className="flex flex-col leading-tight">
          <span className="text-[22px] font-black tracking-[0.02em] text-primary">
            {company.name}
          </span>
          <span className="text-[9px] font-medium tracking-[0.14em] text-text-mid">
            {company.nameEn}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lp-md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href={navCtaDesktop.href}
            className="rounded-full bg-accent px-[22px] py-[11px] text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-dark"
          >
            {navCtaDesktop.label}
          </a>
        </nav>

        <div className="flex items-center gap-2.5 lp-md:hidden">
          <a
            href={company.phoneHref}
            aria-label="電話で相談"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-bg-pale text-[17px] text-primary"
          >
            <span aria-hidden="true">☎</span>
          </a>
          <button
            type="button"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-[38px] w-[38px] flex-col items-center justify-center gap-[5px] rounded-full bg-bg-pale"
          >
            <span
              aria-hidden="true"
              className={`block h-[2px] w-[18px] bg-primary transition-transform duration-200 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-[2px] w-[18px] bg-primary transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block h-[2px] w-[18px] bg-primary transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav-menu"
          className="absolute inset-x-0 top-full flex flex-col border-b border-border bg-bg-white shadow-lg lp-md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="min-h-11 border-b border-border px-6 py-4 text-[15px] font-medium text-text-dark"
            >
              {link.label}
            </a>
          ))}
          <a
            href={navCtaMobile.href}
            onClick={() => setIsMenuOpen(false)}
            className="min-h-11 px-6 py-4 text-[15px] font-bold text-accent-dark"
          >
            {navCtaMobile.label}
          </a>
        </nav>
      )}
    </header>
  );
}
