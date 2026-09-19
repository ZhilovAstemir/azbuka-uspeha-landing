import { site, facts } from "@/lib/content";
import HeroVisual from "@/components/HeroVisual";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-start lg:items-center overflow-hidden pt-28 pb-16">
      {/* мягкие цветные пятна в цветах логотипа */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[440px] h-[440px] rounded-full bg-sun/25 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-sky/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-[420px] h-[420px] rounded-full bg-teal/15 blur-3xl animate-blob [animation-delay:-3s]" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Левая колонка — контент */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-extrabold text-sm text-coral shadow-[var(--shadow-soft)]">
            🔥 {site.promo.title}
          </span>

          <h1 className="mt-5 font-display font-bold text-[clamp(calc(2.2rem-4px),calc(5.2vw-4px),calc(4rem-4px))] leading-[1.05] text-ink">
            От первых знаний —{" "}
            <span className="grad-text">к профессиям</span>{" "}
            <span className="grad-text-2">будущего</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ink-soft font-semibold">
            «{site.name}» — детский центр развития в {site.city}е для детей {site.ages}.
            Продлёнка, подготовка к школе, английский, шахматы, скорочтение, творчество
            и нейроупражнения — очно, в комфортной и безопасной атмосфере.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a href="#contacts" className="btn btn-primary btn-lg">Записаться на продлёнку</a>
            <a href="#programs" className="btn btn-ghost btn-lg">Все направления</a>
          </div>

          <ul className="mt-10 grid grid-cols-3 gap-x-3 gap-y-4 sm:flex sm:flex-wrap sm:gap-x-8">
            {facts.map((f, i) => (
              <li key={f.label} className="leading-tight">
                <span className={`block font-display font-bold text-2xl sm:text-3xl ${["text-coral", "text-brand", "text-teal"][i]}`}>{f.value}</span>
                <span className="text-xs sm:text-sm font-semibold text-ink-soft">{f.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-semibold text-ink-soft">
            📍 {site.address} ·{" "}
            <a href={`tel:${site.phoneHref}`} className="inline-block py-1 text-brand hover:underline whitespace-nowrap">{site.phone}</a>
          </p>
        </div>

        {/* Правая колонка — живая фото-композиция */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[560px] aspect-square mt-6 sm:mt-0">
          <HeroVisual />
        </div>
      </div>

      <a
        href="#advantages"
        aria-label="Листать вниз"
        className="hidden sm:grid absolute left-1/2 -translate-x-1/2 bottom-6 z-10 place-items-center w-10 h-10 rounded-full bg-white/80 shadow-[var(--shadow-soft)]"
      >
        <span className="block w-2.5 h-2.5 border-b-2 border-r-2 border-brand rotate-45 -mt-1 [animation:bounce-down_1.6s_ease-in-out_infinite]" />
      </a>
    </section>
  );
}
