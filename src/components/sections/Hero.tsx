import { site, facts } from "@/lib/content";
import Hero3D from "@/components/Hero3D";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-start lg:items-center overflow-hidden pt-28 pb-16">
      {/* мягкие цветные пятна на фоне всей секции */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[440px] h-[440px] rounded-full bg-brand/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-pink/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 w-[420px] h-[420px] rounded-full bg-teal/15 blur-3xl animate-blob [animation-delay:-3s]" />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        {/* Левая колонка — контент */}
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 font-extrabold text-sm shadow-[var(--shadow-soft)]">
            🔥 {site.promo.title} {site.promo.text}
          </span>

          <h1 className="mt-5 font-display font-bold text-[clamp(2.2rem,5.2vw,4rem)] leading-[1.05] text-ink">
            От первых знаний —{" "}
            <span className="grad-text">к профессиям</span>{" "}
            <span className="grad-text-2">будущего</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ink-soft font-semibold">
            «{site.name}» — детский центр развития в {site.city}е для детей {site.ages}.
            Продлёнка, подготовка к школе, английский, шахматы, скорочтение, творчество
            и нейроупражнения — очно, в комфортной и безопасной атмосфере.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contacts" className="btn btn-primary btn-lg">Записаться на продлёнку</a>
            <a href="#programs" className="btn btn-ghost btn-lg">Все направления</a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {facts.map((f) => (
              <li key={f.label} className="leading-tight">
                <span className="block font-display font-bold text-3xl text-brand">{f.value}</span>
                <span className="text-sm font-semibold text-ink-soft">{f.label}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm font-semibold text-ink-soft">
            📍 {site.address} · <a href={`tel:${site.phoneHref}`} className="text-brand hover:underline">{site.phone}</a>
          </p>
        </div>

        {/* Правая колонка — 3D-сцена в собственной области */}
        <div className="relative h-[340px] sm:h-[420px] lg:h-[560px] rounded-[2rem] lg:rounded-none overflow-hidden lg:overflow-visible bg-gradient-to-br from-white/60 to-brand/5 lg:bg-none">
          <Hero3D />
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
