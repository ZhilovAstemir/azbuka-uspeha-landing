import { programs, prodlenka, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead
          eyebrow="Наши направления"
          title="Программы для детей от 3 до 17 лет"
          sub="Очные занятия в центре Нальчика — от подготовки к школе до английского для старшеклассников."
        />

        {/* Акцент: продлёнка */}
        <Reveal>
          <div className="card overflow-hidden mb-8 grid md:grid-cols-[1.35fr_1fr]">
            <div className="p-8 sm:p-10">
              <span className="eyebrow !bg-coral/10 !text-coral">🔥 {site.promo.title} {site.promo.text}</span>
              <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-ink">
                {prodlenka.title} 🎒
              </h3>
              <p className="mt-3 text-ink-soft font-semibold text-lg">{prodlenka.lead}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-ink font-semibold">
                {prodlenka.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3 items-center">
                <a href="#contacts" className="btn btn-primary">Забронировать место</a>
                <a href={`tel:${site.phoneHref}`} className="text-sm font-bold text-brand hover:underline">
                  или позвоните {site.phone}
                </a>
              </div>
            </div>
            <div
              className="relative min-h-[220px] grid place-items-center overflow-hidden"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-sky))" }}
            >
              <span className="absolute -left-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
              <span className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-white/10" />
              <div className="relative text-center text-white">
                <div className="text-[6rem] leading-none animate-floaty">🎒</div>
                <div className="mt-2 font-display font-bold text-xl">после школы — с пользой</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.06}>
              <TiltCard className="card h-full p-6 relative overflow-hidden flex flex-col">
                <span className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-15" style={{ background: p.color }} />
                <div
                  className="grid place-items-center w-16 h-16 rounded-2xl text-4xl mb-4"
                  style={{ background: `color-mix(in srgb, ${p.color} 14%, white)` }}
                >
                  {p.emoji}
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">{p.title}</h3>
                <p className="text-ink-soft font-medium leading-relaxed mb-4 flex-1">{p.text}</p>
                <span className="inline-block self-start text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ background: p.color }}>
                  {p.age}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a href="#contacts" className="btn btn-primary btn-lg">Подобрать направление ребёнку</a>
        </Reveal>
      </div>
    </section>
  );
}
