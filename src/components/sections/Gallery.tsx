import Image from "next/image";
import { gallery } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

/** Живые кадры с занятий: сетка 3 колонки, первый кадр — широкий. */
export function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28 bg-mint">
      <div className="container-x">
        <SectionHead
          eyebrow="Атмосфера центра"
          title="Как проходят занятия"
          sub="Светлые кабинеты, игровая зона, шахматы, письмо и нейроупражнения — кадры с реальных занятий в «Азбуке успеха»."
        />
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 [grid-auto-rows:200px] sm:[grid-auto-rows:240px]">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.06} className={g.wide ? "min-[400px]:col-span-2" : ""}>
              <figure className="group relative w-full h-full rounded-3xl overflow-hidden shadow-[var(--shadow-soft)]">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: g.pos ?? "center" }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-ink/70 to-transparent text-white text-sm font-bold">
                  {g.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
