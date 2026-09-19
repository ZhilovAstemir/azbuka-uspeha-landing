import { reviews } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white border-y border-line">
      <div className="container-x">
        <SectionHead eyebrow="06 — Отзывы родителей" title="Нам доверяют самое дорогое" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="card h-full p-7 flex flex-col">
                <div className="flex items-center gap-1 text-sun mb-5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Icon key={k} name="star" className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="text-ink leading-relaxed flex-1">{r.text}</blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-lav text-brand font-display font-semibold text-sm">
                    {r.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-ink text-sm">
                    {r.name}
                    <span className="block font-medium text-ink-soft">{r.child}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
