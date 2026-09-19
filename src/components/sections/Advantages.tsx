import { advantages } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Advantages() {
  return (
    <section id="advantages" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Почему выбирают нас"
          title={<>Всё для того, чтобы ребёнок <span className="grad-text">полюбил учиться</span></>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06}>
              <TiltCard className="card h-full p-7">
                <div
                  className="grid place-items-center w-16 h-16 rounded-2xl text-3xl mb-5"
                  style={{ background: `color-mix(in srgb, ${a.color} 16%, white)` }}
                >
                  {a.icon}
                </div>
                <h3 className="font-display font-bold text-xl text-ink mb-2">{a.title}</h3>
                <p className="text-ink-soft font-medium leading-relaxed">{a.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
