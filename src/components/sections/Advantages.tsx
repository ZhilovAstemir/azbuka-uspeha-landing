import { advantages } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

export function Advantages() {
  return (
    <section id="advantages" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="01 — Почему выбирают нас"
          title={<>Всё для того, чтобы ребёнок <span className="grad-text">полюбил учиться</span></>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.06}>
              <article className="card card-hover h-full p-7">
                <div
                  className="grid place-items-center w-12 h-12 rounded-xl mb-6"
                  style={{ background: `color-mix(in srgb, ${a.color} 12%, white)`, color: a.color }}
                >
                  <Icon name={a.icon} className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-[1.05rem] text-ink mb-2.5 leading-snug">{a.title}</h3>
                <p className="text-ink-soft leading-relaxed">{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
