import { programs, prodlenka, academy, site } from "@/lib/content";
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
          sub="Очные занятия в центре Нальчика — от подготовки к школе до английского, программирования и кибербезопасности для старшеклассников."
        />

        {/* Акцент: продлёнка */}
        <Reveal>
          <div className="card overflow-hidden mb-8 grid md:grid-cols-[1.35fr_1fr]">
            <div className="p-6 sm:p-10">
              <span className="eyebrow !bg-coral/10 !text-coral">🔥 {site.promo.title}</span>
              <h3 className="mt-3 font-display font-bold text-xl sm:text-3xl text-ink">
                {prodlenka.title} 🎒
              </h3>
              <p className="mt-3 text-ink-soft font-semibold text-lg">{prodlenka.lead}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-[16px] text-ink font-semibold">
                {prodlenka.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center">
                <a href="#contacts" className="btn btn-primary">Забронировать место</a>
                <a href={`tel:${site.phoneHref}`} className="inline-block py-2 text-sm font-bold text-brand hover:underline">
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

        {/* Акцент: Академия кибербезопасности (отдельный лендинг) */}
        <Reveal>
          <div id="academy" className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-ink text-white mb-8 grid md:grid-cols-[1.35fr_1fr] shadow-[var(--shadow-soft)]">
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-teal/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 w-80 h-80 rounded-full bg-brand/40 blur-3xl" />

            <div className="relative p-6 sm:p-10">
              <span className="eyebrow !bg-white/10 !text-white">🛡️ {academy.audience}</span>
              <h3 className="mt-3 font-display font-bold text-[calc(1.25rem-2px)] sm:text-[calc(1.875rem-2px)] leading-tight break-words">
                Академия <span className="text-coral">кибербезопасности</span>{" "}
                <span className="text-coral">{academy.name.split(" ")[0]}</span>{" "}
                <span className="text-white">{academy.name.split(" ").slice(1).join(" ")}</span>
              </h3>
              <p className="mt-3 text-white/80 font-semibold text-lg">{academy.lead}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-[16px] font-semibold">
                {academy.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="text-teal">✔</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center">
                <a href={academy.url} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
                  Перейти на сайт Академии ↗
                </a>
                <a href="#contacts" className="btn btn-ghost">Спросить о наборе</a>
              </div>
            </div>

            <div className="relative p-6 sm:p-10 md:border-l border-white/10 bg-white/[0.04] flex flex-col justify-center">
              <div className="font-mono text-xs text-teal/80 mb-3">student@zeroday:~$ первое занятие</div>
              <div className="flex flex-wrap gap-2">
                {academy.stack.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-sm font-semibold">
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-white/60 font-medium">Red Team vs Blue Team — учим и атаковать, и защищать.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
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
                <span className="inline-block self-start text-[0.8rem] font-extrabold px-3 py-1.5 rounded-full text-white" style={{ background: p.color }}>
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
