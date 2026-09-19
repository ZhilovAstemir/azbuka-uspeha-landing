"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * 2D-композиция героя: реальные фото центра + «живые» элементы в цветах логотипа.
 *  • кольцо-градиент как на логотипе медленно вращается и докручивается при скролле;
 *  • слои двигаются с разной скоростью за курсором (параллакс) и уезжают при прокрутке;
 *  • буквы азбуки и бейджи «впрыгивают» при загрузке и плавно парят.
 * Уважает prefers-reduced-motion.
 */

const spring = { stiffness: 60, damping: 18, mass: 0.6 };

function useParallax(mx: MotionValue<number>, my: MotionValue<number>, k: number) {
  const x = useTransform(mx, (v) => v * k);
  const y = useTransform(my, (v) => v * k);
  return { x, y };
}

const letters = [
  { ch: "А", bg: "var(--color-coral)", cls: "left-[2%] top-[6%]", delay: 0.1, k: 34 },
  { ch: "Б", bg: "var(--color-sun)", cls: "right-[4%] top-[2%]", delay: 0.2, k: 26 },
  { ch: "В", bg: "var(--color-teal)", cls: "left-[0%] bottom-[10%]", delay: 0.3, k: 30 },
  { ch: "Г", bg: "var(--color-brand)", cls: "right-[0%] bottom-[22%]", delay: 0.4, k: 22 },
];

export default function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  // Параллакс от прокрутки включаем только на широких экранах: на телефоне блок стоит
  // под текстом, и сдвиг по scrollY уводил карточки и бейджи вниз, за границы композиции.
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const { scrollY } = useScroll();
  const k = desktop && !reduce ? 1 : 0;
  const ringRotate = useTransform(scrollY, [0, 800], [0, 120 * k]);
  const photoY = useTransform(scrollY, [0, 800], [0, 90 * k]);
  const cardY = useTransform(scrollY, [0, 800], [0, 160 * k]);
  const badgeY = useTransform(scrollY, [0, 800], [0, 220 * k]);

  const pPhoto = useParallax(sx, sy, 14);
  const pCard1 = useParallax(sx, sy, 40);
  const pCard2 = useParallax(sx, sy, 28);
  const pBadge = useParallax(sx, sy, 50);

  const pop = (delay: number) => ({
    initial: { opacity: 0, scale: 0.6, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { type: "spring" as const, stiffness: 220, damping: 16, delay },
  });

  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">
      {/* Кольцо-градиент в цветах логотипа */}
      <motion.div style={{ rotate: ringRotate }} className="absolute inset-[6%] rounded-full">
        <div
          className="w-full h-full rounded-full animate-spin-slow opacity-90"
          style={{
            background:
              "conic-gradient(from 0deg, #d91119, #f28c28, #e6b632, #459e34, #4a9bd1, #4460a8, #986c9e, #d91119)",
            WebkitMask: "radial-gradient(circle, transparent 78%, #000 79%)",
            mask: "radial-gradient(circle, transparent 78%, #000 79%)",
          }}
        />
      </motion.div>

      {/* Главное фото в круге */}
      <motion.div
        style={{ x: pPhoto.x, y: pPhoto.y }}
        className="absolute inset-[12%] rounded-full overflow-hidden shadow-[var(--shadow-soft)] ring-8 ring-white"
      >
        <motion.div style={{ y: photoY }} className="absolute inset-0 scale-110">
          <Image
            src="/images/post2-podgotovka.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[50%_30%]"
            sizes="(max-width: 1024px) 80vw, 45vw"
          />
        </motion.div>
      </motion.div>

      {/* Фото-карточки */}
      <motion.div
        {...pop(0.35)}
        style={{ x: pCard1.x, y: pCard1.y }}
        className="absolute -right-2 top-[14%] w-[34%] aspect-[3/4] max-w-[180px]"
      >
        <motion.div style={{ y: cardY }} className="w-full h-full rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] ring-4 ring-white rotate-6 animate-floaty">
          <Image src="/images/post7-prodlenka.jpg" alt="" fill className="object-cover" sizes="180px" />
        </motion.div>
      </motion.div>

      <motion.div
        {...pop(0.5)}
        style={{ x: pCard2.x, y: pCard2.y }}
        className="absolute -left-2 bottom-[8%] w-[32%] aspect-[3/4] max-w-[170px]"
      >
        <motion.div style={{ y: cardY }} className="w-full h-full rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] ring-4 ring-white -rotate-6 animate-floaty [animation-delay:-2.5s]">
          <Image src="/images/post4-english-junior.jpg" alt="" fill className="object-cover" sizes="170px" />
        </motion.div>
      </motion.div>

      {/* Бейджи */}
      <motion.div {...pop(0.65)} style={{ x: pBadge.x, y: pBadge.y }} className="absolute left-[16%] sm:left-[30%] top-0">
        <motion.div style={{ y: badgeY }} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-coral text-white font-extrabold text-xs sm:text-sm shadow-lg animate-floaty [animation-delay:-1s] whitespace-nowrap">
          🔥 −20% на продлёнку
        </motion.div>
      </motion.div>
      <motion.div {...pop(0.8)} style={{ x: pBadge.x, y: pBadge.y }} className="absolute right-[2%] bottom-[2%]">
        <motion.div style={{ y: badgeY }} className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white text-ink font-extrabold text-xs sm:text-sm shadow-lg animate-floaty [animation-delay:-3.5s] whitespace-nowrap">
          🎒 3–17 лет
        </motion.div>
      </motion.div>

      {/* Буквы азбуки */}
      {letters.map((l) => (
        <motion.div
          key={l.ch}
          {...pop(l.delay)}
          className={`absolute ${l.cls}`}
        >
          <LetterTile {...l} mx={sx} my={sy} />
        </motion.div>
      ))}
    </div>
  );
}

function LetterTile({
  ch, bg, k, mx, my,
}: { ch: string; bg: string; k: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const p = useParallax(mx, my, k);
  return (
    <motion.div
      style={{ x: p.x, y: p.y, background: bg }}
      className="grid place-items-center w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl text-white font-display font-bold text-xl sm:text-2xl shadow-lg animate-floaty"
    >
      {ch}
    </motion.div>
  );
}
