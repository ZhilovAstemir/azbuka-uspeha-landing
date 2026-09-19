import Image from "next/image";
import { site } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Icon } from "../Icon";

const points = [
  "Комфортная и безопасная атмосфера",
  "Внимание к каждому ребёнку и забота о его самочувствии",
  "Родители спокойны, а дети занимаются, общаются и отдыхают с пользой",
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="relative max-w-[520px] mx-auto">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-[var(--shadow-lift)]">
              <Image
                src="/images/post7-prodlenka.jpg"
                alt="Девочка выполняет задание на занятии"
                fill
                className="object-cover object-[50%_40%]"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <div className="absolute -right-4 sm:-right-8 bottom-10 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shadow-[var(--shadow-lift)] ring-4 ring-bg">
              <Image src="/images/post9-prodlenka.jpg" alt="Развивающая настольная игра" fill className="object-cover" sizes="176px" />
            </div>
            <div className="absolute -left-3 sm:-left-6 top-8 bg-white rounded-2xl px-5 py-4 shadow-[var(--shadow-lift)] border border-line">
              <div className="text-xs font-semibold tracking-[0.12em] uppercase text-brand">Наш девиз</div>
              <div className="mt-1 font-display font-semibold text-ink">{site.slogan}</div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            eyebrow={`03 — О центре`}
            title={<>Знания сегодня — <span className="grad-text">успех завтра</span></>}
            className="!mb-6"
          />
          <p className="text-ink-soft text-lg leading-relaxed">
            Мы помогаем детям от 3 до 17 лет спокойно и продуктивно учиться: выполнять домашние
            задания под присмотром педагогов, разбираться с непонятными темами, закреплять
            пройденное и открывать новое — от английского и шахмат до программирования
            и нейроупражнений.
          </p>
          <ul className="mt-8 space-y-4">
            {points.map((t) => (
              <li key={t} className="flex items-start gap-3 font-medium text-ink">
                <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-teal/15 text-teal shrink-0">
                  <Icon name="check" className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#contacts" className="btn btn-secondary">Познакомиться с центром</a>
            <a href="#teachers" className="btn btn-outline">Наши педагоги</a>
          </div>
        </div>
      </div>
    </section>
  );
}
