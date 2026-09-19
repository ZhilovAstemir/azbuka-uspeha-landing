import { programs, prodlenka, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

/** Убираем ведущий эмодзи из строк списка — в этой версии дизайна иконки свои. */
const stripEmoji = (s: string) => s.replace(/^[^\p{L}\p{N}]+/u, "").trim();

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-white border-y border-line">
      <div className="container-x">
        <SectionHead
          eyebrow="02 — Направления"
          title="Программы для детей от 3 до 17 лет"
          sub="Очные занятия в центре Нальчика — от подготовки к школе до английского и программирования для старшеклассников."
        />

        {/* Ключевой продукт — продлёнка */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink text-white grid lg:grid-cols-[1.2fr_1fr]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative p-8 sm:p-12">
              <span className="tag bg-accent text-white">
                <Icon name="fire" className="w-4 h-4 mr-1.5" />
                {site.promo.title} {site.promo.text}
              </span>
              <h3 className="h-display mt-6 text-[clamp(1.5rem,3vw,2.2rem)]">{prodlenka.title}</h3>
              <p className="mt-4 text-white/75 text-lg leading-relaxed max-w-xl">{prodlenka.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3 items-center">
                <a href="#contacts" className="btn btn-primary">
                  Забронировать место
                  <Icon name="arrow" className="w-4 h-4" strokeWidth={2.2} />
                </a>
                <a href={`tel:${site.phoneHref}`} className="btn btn-outline !text-white !border-white/25 hover:!border-white">
                  {site.phone}
                </a>
              </div>
            </div>

            <div className="relative p-8 sm:p-12 lg:border-l border-white/10 bg-white/[0.04]">
              <div className="text-xs font-semibold tracking-[0.14em] uppercase text-white/60 mb-5">Что входит</div>
              <ul className="space-y-3.5">
                {prodlenka.includes.map((i) => (
                  <li key={i} className="flex items-start gap-3 font-medium">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-teal/25 text-teal shrink-0">
                      <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                    {stripEmoji(i)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Сетка направлений */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <article className="card card-hover h-full p-7 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="grid place-items-center w-12 h-12 rounded-xl"
                    style={{ background: `color-mix(in srgb, ${p.color} 12%, white)`, color: p.color }}
                  >
                    <Icon name={p.icon} className="w-6 h-6" />
                  </div>
                  <span className="font-display text-sm text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-display font-semibold text-[1.05rem] text-ink mb-2.5 leading-snug">{p.title}</h3>
                <p className="text-ink-soft leading-relaxed flex-1">{p.text}</p>
                <span className="tag mt-6 self-start border border-line text-ink-soft">{p.age}</span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a href="#contacts" className="btn btn-secondary btn-lg">Подобрать направление ребёнку</a>
        </Reveal>
      </div>
    </section>
  );
}
