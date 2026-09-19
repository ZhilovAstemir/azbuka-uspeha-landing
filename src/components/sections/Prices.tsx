import { formats, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Prices() {
  return (
    <section id="prices" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Форматы занятий"
          title="Выберите подходящий формат"
          sub={`Стоимость и расписание подскажем по телефону ${site.phone} или в Direct Instagram.`}
        />
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto items-start">
          {formats.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article
                className={`card h-full p-8 relative ${
                  p.popular ? "md:-mt-4 ring-2 ring-brand shadow-[var(--shadow-brand)]" : ""
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-sm font-extrabold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {p.badge}
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-ink">{p.title}</h3>
                <div className="mt-3 mb-6 font-display font-bold text-3xl text-brand">{p.price}</div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-ink font-semibold">
                      <span className="text-teal">✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className={`btn btn-block ${p.popular ? "btn-primary" : "btn-ghost"}`}>
                  {p.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
