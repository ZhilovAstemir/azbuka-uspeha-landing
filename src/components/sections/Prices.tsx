import { formats, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

export function Prices() {
  return (
    <section id="prices" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="07 — Форматы занятий"
          title="Выберите подходящий формат"
          sub={`Стоимость и расписание подскажем по телефону ${site.phone} или в WhatsApp.`}
        />
        <div className="grid gap-5 md:grid-cols-3 items-stretch">
          {formats.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article
                className={`card h-full p-8 flex flex-col ${
                  p.popular ? "bg-ink !border-ink text-white shadow-[var(--shadow-lift)]" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display font-semibold text-lg">{p.title}</h3>
                  {p.badge && <span className="tag bg-accent text-white">{p.badge}</span>}
                </div>
                <div className={`mt-5 mb-7 font-display font-semibold text-2xl ${p.popular ? "text-white" : "text-ink"}`}>
                  {p.price}
                </div>
                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 ${p.popular ? "text-white/85" : "text-ink"}`}>
                      <span className={`mt-0.5 grid place-items-center w-5 h-5 rounded-full shrink-0 ${p.popular ? "bg-white/15 text-white" : "bg-teal/15 text-teal"}`}>
                        <Icon name="check" className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                      <span className="text-[0.95rem] font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contacts" className={`btn btn-block mt-8 ${p.popular ? "btn-primary" : "btn-outline"}`}>
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
