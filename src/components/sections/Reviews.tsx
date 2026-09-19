import { reviews, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead
          eyebrow="Что о нас говорят"
          title="Тёплые слова из комментариев"
          sub={`Реальные отзывы подписчиков под постами ${site.instagramHandle}`}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.handle} delay={(i % 3) * 0.07}>
              <figure className="card h-full p-6 flex flex-col">
                <blockquote className="text-ink font-bold text-lg leading-relaxed flex-1">{r.text}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-brand text-white font-display font-bold">
                    {r.handle.replace("@", "").charAt(0).toUpperCase()}
                  </span>
                  <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-ink-soft hover:text-brand">
                    {r.handle}
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
