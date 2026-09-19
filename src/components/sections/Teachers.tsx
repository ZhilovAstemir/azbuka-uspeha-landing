import { teachers } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Teachers() {
  return (
    <section id="teachers" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Наша команда" title="Педагоги, которым можно доверить ребёнка" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <TiltCard className="card h-full p-7 text-center">
                <div
                  className="mx-auto grid place-items-center w-24 h-24 rounded-full text-5xl mb-4"
                  style={{ background: `color-mix(in srgb, ${t.color} 18%, white)` }}
                >
                  {t.avatar}
                </div>
                <h3 className="font-display font-bold text-lg text-ink">{t.name}</h3>
                <span className="block text-sm font-bold text-brand mt-1 mb-3">{t.role}</span>
                <p className="text-ink-soft font-medium leading-relaxed">{t.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
