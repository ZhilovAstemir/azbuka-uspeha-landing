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

  // блокируем прокрутку страницы при открытом мобильном меню
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // закрываем меню при переходе на десктопную ширину
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid ? "bg-white shadow-[0_8px_30px_-12px_rgba(43,51,80,0.2)]" : "bg-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-2 h-[68px] min-w-0">
          <Logo />

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 mx-4" aria-label="Основная навигация">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={"external" in l && l.external ? "_blank" : undefined}
                rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
                className="font-bold text-[15px] xl:text-base whitespace-nowrap text-ink/80 hover:text-brand transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a href={`tel:${site.phoneHref}`} className="hidden md:inline lg:hidden xl:inline font-extrabold text-ink hover:text-brand transition-colors whitespace-nowrap">
              {site.phone}
            </a>
            <a href="/#contacts" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Записаться
            </a>

            <button
              className="lg:hidden relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-[var(--shadow-soft)] grid place-items-center shrink-0"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block w-5 h-[14px]">
                <span className={`absolute left-0 h-[2.5px] w-full rounded bg-ink transition-all ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2.5px] w-full rounded bg-ink transition-all ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-[2.5px] w-full rounded bg-ink transition-all ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/*
        Мобильное меню живёт ВНЕ шапки: у шапки при скролле есть blur/тень,
        а такие свойства делают её контейнером для fixed-элементов —
        меню схлопывалось и теряло фон. Здесь оно всегда на весь экран.
      */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[45] bg-cream overflow-y-auto transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav className="container-x flex flex-col gap-2 pt-[88px] pb-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={"external" in l && l.external ? "_blank" : undefined}
              rel={"external" in l && l.external ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="text-2xl font-extrabold py-3 border-b border-ink/10 text-ink"
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${site.phoneHref}`} className="text-xl font-extrabold text-brand mt-4">
            {site.phone}
          </a>
          <a href="/#contacts" onClick={() => setOpen(false)} className="btn btn-primary btn-lg btn-block mt-4">
            Записаться на продлёнку
          </a>
        </nav>
      </div>
    </>
  );
}
