"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/content";

const colors = ["var(--color-coral)", "var(--color-brand)", "var(--color-teal)", "var(--color-pink)", "var(--color-sky)", "var(--color-sun)"];

/** Слайдер отзывов: свайп, стрелки, точки, автопрокрутка (останавливается при наведении). */
export function ReviewsSlider() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // сколько карточек видно одновременно — читаем из ширины
  const visible = useCallback(() => {
    const el = track.current;
    if (!el || !el.firstElementChild) return 1;
    const card = (el.firstElementChild as HTMLElement).getBoundingClientRect().width;
    return Math.max(1, Math.round(el.clientWidth / card));
  }, []);

  const pages = () => Math.max(1, reviews.length - visible() + 1);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    const n = pages();
    const next = ((i % n) + n) % n;
    const card = el.firstElementChild as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollTo({ left: next * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
    setIndex(next);
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  // синхронизируем индекс при ручном свайпе
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || "0");
      setIndex(Math.round(el.scrollLeft / (card.getBoundingClientRect().width + gap)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // автопрокрутка
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(t);
  }, [index, paused, goTo]);

  const dots = Array.from({ length: pages() });

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        ref={track}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className="card snap-start shrink-0 w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] p-7 flex flex-col"
          >
            <div className="text-sun text-xl tracking-widest mb-3">★★★★★</div>
            <blockquote className="text-ink font-semibold leading-relaxed flex-1">«{r.text}»</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                className="grid place-items-center w-11 h-11 rounded-full text-white font-display font-bold"
                style={{ background: colors[i % colors.length] }}
              >
                {r.name.charAt(0)}
              </span>
              <span className="font-bold text-ink">
                {r.name}
                <span className="block text-sm font-semibold text-ink-soft">{r.child}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Предыдущие отзывы"
          className="grid place-items-center w-11 h-11 rounded-full bg-white shadow-[var(--shadow-soft)] text-ink hover:text-brand transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="flex gap-2">
          {dots.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Отзывы, страница ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === index ? "w-7 bg-brand" : "w-2.5 bg-ink/20 hover:bg-ink/40"}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Следующие отзывы"
          className="grid place-items-center w-11 h-11 rounded-full bg-white shadow-[var(--shadow-soft)] text-ink hover:text-brand transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
