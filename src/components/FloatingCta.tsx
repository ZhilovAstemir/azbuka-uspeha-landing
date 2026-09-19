"use client";

import { useEffect, useState } from "react";

/** Плавающая кнопка записи, появляется после прокрутки первого экрана. */
export function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="/#contacts"
      aria-label="Записаться"
      className={`fixed z-40 bottom-4 right-4 sm:bottom-5 sm:right-5 btn btn-primary !px-4 sm:!px-6 shadow-[var(--shadow-brand)] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      🎒<span className="hidden sm:inline"> Записаться</span>
    </a>
  );
}
