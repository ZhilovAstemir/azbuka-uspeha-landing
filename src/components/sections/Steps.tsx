import { steps } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Steps() {
  return (
    <section id="how" className="py-20 sm:py-28 bg-white border-y border-line">
      <div className="container-x">
        <SectionHead eyebrow="04 — Как начать" title="Четыре простых шага до первого занятия" />
        <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <span className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-line" aria-hidden="true" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <li className="relative">
                <div className="relative z-10 grid place-items-center w-12 h-12 rounded-full bg-ink text-white font-display font-semibold">
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold text-[1.05rem] text-ink mt-6 mb-2">{s.title}</h3>
                <p className="text-ink-soft leading-relaxed">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
