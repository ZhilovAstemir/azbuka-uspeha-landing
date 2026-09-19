import Image from "next/image";
import { teachers, site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Teachers() {
  return (
    <section id="teachers" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Наша команда"
          title="Педагоги, которым можно доверить ребёнка"
          sub="Знакомим с преподавателями «Азбуки успеха». Команда растёт — следите за новыми знакомствами в Instagram."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {teachers.map((t) => (
            <Reveal key={t.name}>
              <TiltCard className="card h-full overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={t.photo} alt={t.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-ink">{t.name}</h3>
                  <span className="block text-sm font-bold text-brand mt-1 mb-3">{t.role}</span>
                  <p className="text-ink-soft font-medium leading-relaxed">{t.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="card h-full p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-pink))" }}
            >
              <span className="text-6xl mb-4">👋</span>
              <h3 className="font-display font-bold text-2xl text-white">Скоро — новые знакомства</h3>
              <p className="mt-3 text-white/90 font-semibold">
                Впереди — рассказы о других преподавателях и специалистах центра. Подписывайтесь {site.instagramHandle}.
              </p>
              <span className="btn btn-ghost mt-6">Открыть Instagram</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
