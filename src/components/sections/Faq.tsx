import { faq } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-y border-line">
      <div className="container-x grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20">
        <SectionHead
          eyebrow="08 — Вопросы и ответы"
          title="Отвечаем на важное"
          sub={`Не нашли ответа? Позвоните — подскажем по телефону.`}
        />
        <div className="divide-y divide-line border-y border-line">
          {faq.map((item, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <details className="group">
                <summary className="flex items-center justify-between gap-6 cursor-pointer py-6 font-display font-semibold text-[1.02rem] text-ink">
                  {item.q}
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full border border-line text-ink transition-transform group-open:rotate-45 group-open:bg-ink group-open:text-white">
                    <Icon name="plus" className="w-4 h-4" strokeWidth={2.2} />
                  </span>
                </summary>
                <div className="pb-6 -mt-1 text-ink-soft leading-relaxed max-w-2xl">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
