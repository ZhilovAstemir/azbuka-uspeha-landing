import Image from "next/image";
import { teachers } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

export function Teachers() {
  return (
    <section id="teachers" className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="05 — Команда"
          title="Педагоги, которым можно доверить ребёнка"
          sub="Знакомим с преподавателями «Азбуки успеха». Команда растёт — скоро расскажем о других педагогах и специалистах."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {teachers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="card card-hover h-full overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <Image src={t.photo} alt={t.name} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-[1.05rem] text-ink leading-snug">{t.name}</h3>
                  <span className="block text-sm font-medium text-brand mt-1.5 mb-3">{t.role}</span>
                  <p className="text-ink-soft leading-relaxed text-[0.95rem]">{t.text}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <a href="#contacts" className="card h-full p-8 flex flex-col justify-between bg-ink !border-ink text-white transition-transform hover:-translate-y-1">
              <div>
                <div className="grid place-items-center w-12 h-12 rounded-xl bg-white/10">
                  <Icon name="users" className="w-6 h-6" />
                </div>
                <h3 className="h-display text-2xl mt-8">Познакомьтесь лично</h3>
                <p className="mt-3 text-white/75 leading-relaxed">
                  Приходите в центр: покажем кабинеты, познакомим с педагогами и ответим на все вопросы.
                </p>
              </div>
              <span className="btn btn-white mt-8 self-start">
                Записаться на встречу
                <Icon name="arrow" className="w-4 h-4" strokeWidth={2.2} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
