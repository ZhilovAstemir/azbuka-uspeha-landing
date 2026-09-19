import { steps } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Steps() {
  return (
    <section id="how" className="py-20 sm:py-28 bg-mint">
      <div className="container-x">
        <SectionHead eyebrow="Как начать" title="Всего 4 простых шага" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card h-full p-7 relative">
                <div className="font-display font-bold text-5xl grad-text mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">{s.title}</h3>
                <p className="text-ink-soft font-medium leading-relaxed">{s.text}</p>
                {i < steps.length - 1 && (
                  <span className="hidden lg:block absolute top-10 -right-3 text-2xl text-brand/40">→</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
