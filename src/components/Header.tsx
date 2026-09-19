"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
          solid ? "bg-white/95 border-line" : "bg-transparent border-transparent"
        }`}
      >
        <div className="container-x flex items-center justify-between h-[72px]">
          <Logo />

          <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[0.95rem] font-medium text-ink/75 hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={`tel:${site.phoneHref}`} className="hidden md:inline text-[0.95rem] font-semibold text-ink hover:text-brand transition-colors">
              {site.phone}
            </a>
            <a href="/#contacts" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Записаться
            </a>

            <button
              className="lg:hidden relative w-11 h-11 rounded-xl border border-line bg-white grid place-items-center"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block w-5 h-[14px]">
                <span className={`absolute left-0 h-[2px] w-full rounded bg-ink transition-all ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full rounded bg-ink transition-all ${open ? "opacity-0" : "opacity-100"}`} />
                <span className={`absolute left-0 h-[2px] w-full rounded bg-ink transition-all ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню — вне шапки, чтобы её blur/тень не ломали fixed-позиционирование */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[45] bg-cream overflow-y-auto transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav className="container-x flex flex-col pt-[92px] pb-10">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display font-semibold text-xl py-4 border-b border-line text-ink"
            >
              {l.label}
            </a>
          ))}
          <a href={`tel:${site.phoneHref}`} className="text-lg font-semibold text-brand mt-6">
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
