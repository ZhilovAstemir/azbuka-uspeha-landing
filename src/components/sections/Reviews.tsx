import { reviews } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

const colors = ["var(--color-coral)", "var(--color-brand)", "var(--color-teal)"];

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead eyebrow="Отзывы родителей" title="Нам доверяют самое дорогое" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="card h-full p-7 flex flex-col">
                <div className="text-sun text-xl tracking-widest mb-3">★★★★★</div>
                <blockquote className="text-ink font-semibold leading-relaxed flex-1">«{r.text}»</blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span
                    className="grid place-items-center w-11 h-11 rounded-full text-white font-display font-bold"
                    style={{ background: colors[i % colors.length] }}
                  >
                    {r.name.charAt(0)}
                  </span>
                  <span className="font-bold text-ink">
                    {r.name}
                    <span className="block text-sm font-semibold text-ink-soft">{r.child}</span>
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
