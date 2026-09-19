import Image from "next/image";
import { programs, prodlenka, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead
          eyebrow="Наши направления"
          title="Программы для детей от 3 до 17 лет"
          sub="Очные занятия в центре Нальчика — от подготовки к школе до английского для старшеклассников."
        />

        {/* Акцент: продлёнка */}
        <Reveal>
          <div className="card overflow-hidden mb-8 grid md:grid-cols-[1.35fr_1fr]">
            <div className="p-8 sm:p-10">
              <span className="eyebrow">🔥 {site.promo.title} {site.promo.text}</span>
              <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-ink">
                {prodlenka.title} 🎒
              </h3>
              <p className="mt-3 text-ink-soft font-semibold text-lg">{prodlenka.lead}</p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-ink font-semibold">
                {prodlenka.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3 items-center">
                <a href="#contacts" className="btn btn-primary">Забронировать место</a>
                <span className="text-sm font-semibold text-ink-soft">
                  или напишите «{site.codeWord}» в Direct{" "}
                  <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                    {site.instagramHandle}
                  </a>
                </span>
              </div>
            </div>
            <div className="relative min-h-[260px] md:min-h-full">
              <Image src={prodlenka.image} alt="Занятие на продлёнке в «Азбуке успеха»" fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.06}>
              <TiltCard className="card h-full overflow-hidden relative flex flex-col">
                {p.image ? (
                  <div className="relative h-40">
                    <Image src={p.image} alt={p.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 25vw" />
                  </div>
                ) : (
                  <div className="h-40 grid place-items-center text-6xl" style={{ background: `color-mix(in srgb, ${p.color} 14%, white)` }}>
                    {p.emoji}
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-lg text-ink mb-2">{p.title}</h3>
                  <p className="text-ink-soft font-medium leading-relaxed mb-4 flex-1">{p.text}</p>
                  <span className="inline-block self-start text-xs font-extrabold px-3 py-1.5 rounded-full text-white" style={{ background: p.color }}>
                    {p.age}
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a href="#contacts" className="btn btn-primary btn-lg">Подобрать направление ребёнку</a>
        </Reveal>
      </div>
    </section>
  );
}
