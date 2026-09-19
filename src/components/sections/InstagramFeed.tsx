import Image from "next/image";
import { instagramPosts, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function InstagramFeed() {
  return (
    <section id="instagram" className="py-20 sm:py-28 bg-mint">
      <div className="container-x">
        <SectionHead
          eyebrow="Мы в Instagram"
          title={<>Жизнь центра — в {site.instagramHandle}</>}
          sub="Видео с занятий, знакомство с педагогами, акции и новости. Подписывайтесь, чтобы ничего не пропустить."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {instagramPosts.map((p, i) => (
            <Reveal key={p.url} delay={(i % 3) * 0.06}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]"
              >
                <Image
                  src={p.image}
                  alt={p.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-ink/80 to-transparent text-white font-bold text-sm sm:text-base">
                  {p.caption}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-10">
          <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
            Подписаться на {site.instagramHandle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
