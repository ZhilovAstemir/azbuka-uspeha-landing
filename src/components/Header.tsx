"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // блокируем прокрутку body при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(45,42,69,0.2)]" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-[68px]">
        <Logo />

        <nav className="hidden lg:flex items-center gap-7" aria-label="Основная навигация">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-bold text-ink/80 hover:text-brand transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phoneHref}`}
            className="hidden md:inline font-extrabold text-ink hover:text-brand transition-colors"
          >
            {site.phone}
          </a>
          <a href="#contacts" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Записаться
          </a>

          <button
            className="lg:hidden relative w-11 h-11 rounded-full bg-white shadow-[var(--shadow-soft)] grid place-items-center"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block w-5 h-[14px]">
              <span
                className={`absolute left-0 h-[2.5px] w-full rounded bg-ink transition-all ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-full rounded bg-ink transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[2.5px] w-full rounded bg-ink transition-all ${
                  open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[68px] bottom-0 bg-cream/98 backdrop-blur-md transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="container-x flex flex-col gap-2 pt-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-extrabold py-3 border-b border-ink/10"
            >
              {l.label}
            </a>
          ))}
          <a
            href={`tel:${site.phoneHref}`}
            className="text-xl font-extrabold text-brand mt-4"
          >
            {site.phone}
          </a>
          <a
            href="#contacts"
            onClick={() => setOpen(false)}
            className="btn btn-primary btn-lg btn-block mt-4"
          >
            Записаться на продлёнку
          </a>
        </nav>
      </div>
    </header>
  );
}
