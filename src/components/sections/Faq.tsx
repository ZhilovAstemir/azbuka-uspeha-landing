import { faq } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-mint">
      <div className="container-x max-w-3xl">
        <SectionHead eyebrow="Частые вопросы" title="Отвечаем на важное" />
        <div className="space-y-4">
          {faq.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="group card p-0 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 font-display font-bold text-lg text-ink">
                  {item.q}
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full bg-brand/10 text-brand text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 -mt-1 text-ink-soft font-medium leading-relaxed">
                  {item.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
