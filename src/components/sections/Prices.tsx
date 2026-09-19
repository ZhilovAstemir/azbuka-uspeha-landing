import { prices } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Prices() {
  return (
    <section id="prices" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Стоимость занятий"
          title="Прозрачные цены без скрытых платежей"
          sub="Первое пробное занятие — бесплатно. Абонемент выгоднее разовых занятий."
        />
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto items-start">
          {prices.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article
                className={`card h-full p-8 relative ${
                  p.popular ? "md:-mt-4 ring-2 ring-brand shadow-[var(--shadow-brand)]" : ""
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-white text-sm font-extrabold px-4 py-1.5 rounded-full whitespace-nowrap">
                    Хит выбора
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-ink">{p.title}</h3>
                <div className="mt-3 mb-6 font-display font-bold text-4xl text-brand">{p.price}</div>
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
        <p className="text-center text-sm text-ink-soft mt-8 font-medium">
          * Цены указаны для примера — замените на ваши актуальные тарифы в файле контента.
        </p>
      </div>
    </section>
  );
}
