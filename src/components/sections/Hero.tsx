import { site, facts } from "@/lib/content";
import HeroMedia from "@/components/HeroMedia";
import { Icon } from "@/components/Icon";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-dots">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.9),rgba(246,247,250,0.4)_60%,transparent)]" />

      <div className="container-x relative grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-12 items-center">
        <div>
          <span className="eyebrow">{site.tagline}</span>

          <h1 className="h-display mt-6 text-[clamp(2rem,4.6vw,3.6rem)] text-ink">
            От первых знаний — <span className="grad-text">к профессиям будущего</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-ink-soft leading-relaxed max-w-xl">
            «{site.name}» — детский центр развития в {site.city}е для детей {site.ages}. Продлёнка,
            подготовка к школе, английский, программирование, шахматы, скорочтение, творчество
            и нейроупражнения — очно, в комфортной и безопасной атмосфере.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contacts" className="btn btn-primary btn-lg">
              Записаться на продлёнку
              <Icon name="arrow" className="w-4 h-4" strokeWidth={2.2} />
            </a>
            <a href="#programs" className="btn btn-outline btn-lg">Все направления</a>
          </div>

          <ul className="mt-12 grid grid-cols-3 max-w-lg divide-x divide-line">
            {facts.map((f) => (
              <li key={f.label} className="px-4 first:pl-0">
                <div className="font-display font-semibold text-2xl sm:text-3xl text-ink">{f.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-ink-soft font-medium leading-snug">{f.label}</div>
              </li>
            ))}
          </ul>

          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-ink-soft">
            <span className="inline-flex items-center gap-2"><Icon name="pin" className="w-4 h-4" /> {site.address}</span>
            <a href={`tel:${site.phoneHref}`} className="inline-flex items-center gap-2 text-ink hover:text-brand whitespace-nowrap">
              <Icon name="phone" className="w-4 h-4" /> {site.phone}
            </a>
          </p>
        </div>

        <div className="lg:pl-6">
          <HeroMedia />
        </div>
      </div>
    </section>
  );
}
