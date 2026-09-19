"use client";

import { useEffect, useState } from "react";

/** Плавающая кнопка «Записаться», появляется после прокрутки первого экрана. */
export function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#contacts"
      className={`fixed z-40 bottom-5 right-5 btn btn-primary shadow-[var(--shadow-brand)] transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      🎁 Записаться
    </a>
  );
}
