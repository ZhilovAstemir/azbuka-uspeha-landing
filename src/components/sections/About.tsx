import Image from "next/image";
import { site, facts } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Фото-коллаж из реальных снимков центра */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-[var(--shadow-soft)]">
              <Image src="/images/post7-prodlenka.jpg" alt="Девочка выполняет задание на занятии" fill className="object-cover object-[50%_40%]" sizes="(max-width: 1024px) 90vw, 40vw" />
            </div>
            <div className="absolute -right-4 -top-6 w-32 h-40 rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] ring-4 ring-cream animate-floaty [animation-delay:-1.5s]">
              <Image src="/images/g-desks-girls.jpg" alt="Дети на занятии" fill className="object-cover object-[50%_35%]" sizes="128px" />
            </div>
            <div className="absolute -left-5 bottom-8 w-28 h-28 rounded-3xl overflow-hidden shadow-[var(--shadow-soft)] ring-4 ring-cream animate-floaty [animation-delay:-3s]">
              <Image src="/images/post9-prodlenka.jpg" alt="Развивающая настольная игра" fill className="object-cover" sizes="112px" />
            </div>
            <div className="absolute right-6 -bottom-5 px-4 py-2 rounded-full bg-brand text-white font-extrabold shadow-[var(--shadow-brand)]">
              {site.slogan}
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            center={false}
            eyebrow={`О центре «${site.name}»`}
            title={<>Знания сегодня — <span className="grad-text">успех завтра</span></>}
          />
          <div className="-mt-6">
            <p className="text-ink-soft font-semibold text-lg leading-relaxed">
              Мы помогаем детям от 3 до 17 лет спокойно и продуктивно учиться: выполнять домашние
              задания под присмотром педагогов, разбираться с непонятными темами, закреплять
              пройденное и открывать новое — от английского и шахмат до театра и нейроупражнений.
            </p>
            <ul className="mt-6 space-y-2 font-semibold text-ink">
              <li>✅ Комфортная и безопасная атмосфера</li>
              <li>✅ Внимание к каждому ребёнку и забота о его самочувствии</li>
              <li>✅ Родители спокойны, а дети занимаются, общаются и отдыхают с пользой</li>
            </ul>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <div className="font-display font-bold text-3xl sm:text-4xl grad-text">{f.value}</div>
                  <div className="text-sm font-bold text-ink-soft mt-1">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
