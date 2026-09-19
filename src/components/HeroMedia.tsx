"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";
import { Icon } from "./Icon";

/**
 * Медиа-блок героя: крупное фото с двумя информационными карточками.
 * Мягкий параллакс при прокрутке, появление карточек с задержкой.
 */
export default function HeroMedia() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 60]);
  const cardY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 120]);

  const pop = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="relative w-full aspect-[4/5] max-w-[520px] mx-auto lg:ml-auto">
      {/* декоративная подложка */}
      <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-sun/30 via-transparent to-sky/25" />

      <motion.div
        {...pop(0.1)}
        className="absolute inset-0 rounded-[28px] overflow-hidden shadow-[var(--shadow-lift)]"
      >
        <motion.div style={{ y: photoY }} className="absolute -inset-y-10 inset-x-0">
          <Image
            src="/images/post2-podgotovka.jpg"
            alt="Ребёнок на занятии в центре «Азбука успеха»"
            fill
            priority
            className="object-cover object-[50%_22%]"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
      </motion.div>

      {/* карточка акции */}
      <motion.div {...pop(0.45)} style={{ y: cardY }} className="absolute -left-4 sm:-left-8 bottom-8 max-w-[300px]">
        <div className="bg-white rounded-2xl p-5 shadow-[var(--shadow-lift)] border border-line">
          <div className="flex items-center gap-2 text-accent">
            <Icon name="fire" className="w-5 h-5" />
            <span className="text-xs font-semibold tracking-[0.12em] uppercase">Акция</span>
          </div>
          <div className="mt-2 font-display font-semibold text-ink text-lg leading-snug">{site.promo.title}</div>
          <div className="mt-1 text-sm text-ink-soft font-medium">{site.promo.text}</div>
        </div>
      </motion.div>

      {/* карточка возраста */}
      <motion.div {...pop(0.6)} className="absolute -right-3 sm:-right-6 top-8">
        <div className="bg-ink text-white rounded-2xl px-5 py-4 shadow-[var(--shadow-lift)] animate-floaty">
          <div className="font-display font-semibold text-2xl leading-none">{site.ages}</div>
          <div className="mt-1 text-xs text-white/70 font-medium">возраст учеников</div>
        </div>
      </motion.div>
    </div>
  );
}
