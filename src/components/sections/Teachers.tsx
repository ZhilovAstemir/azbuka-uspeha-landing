import Image from "next/image";
import { teachers } from "@/lib/content";
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
          sub="Знакомим с преподавателями «Азбуки успеха». Команда растёт — скоро расскажем о других педагогах и специалистах."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((t) => (
            <Reveal key={t.name}>
              <TiltCard className="card h-full overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={t.photo} alt={t.name} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
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
              href="#contacts"
              className="card h-full p-6 sm:p-8 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-sky))" }}
            >
              <span className="text-6xl mb-4">👋</span>
              <h3 className="font-display font-bold text-xl text-white">Познакомьтесь лично</h3>
              <p className="mt-3 text-white/90 font-semibold">
                Приходите в центр: покажем кабинеты, познакомим с педагогами и ответим на все вопросы.
              </p>
              <span className="btn btn-ghost mt-6 whitespace-normal max-w-full">Записаться на встречу</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
