import { programs } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";

export function Programs() {
  return (
    <section id="programs" className="py-20 sm:py-28 bg-lav">
      <div className="container-x">
        <SectionHead
          eyebrow="Наши направления"
          title="Программы для любого возраста и интереса"
          sub="Очные занятия в уютном центре — от первых шагов малыша до уверенной подготовки к школе и увлечений будущего."
        />

        {/* Акцент: продлёнка */}
        <Reveal>
          <div className="card overflow-hidden mb-8 grid md:grid-cols-[1.4fr_1fr]">
            <div className="p-8 sm:p-10">
              <span className="eyebrow">Хит для школьников</span>
              <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl text-ink">
                Продлёнка полного дня 🎒
              </h3>
              <p className="mt-3 text-ink-soft font-semibold text-lg">
                Встретим ребёнка после школы, вкусно накормим, поможем с домашними заданиями
                и займём развивающими кружками. Вы спокойны — ребёнок под присмотром и при деле.
              </p>
              <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-ink font-semibold">
                <li>🍲 Горячее питание</li>
                <li>📖 Помощь с уроками</li>
                <li>🎨 Кружки и прогулки</li>
                <li>🕕 Гибкое время до вечера</li>
              </ul>
              <a href="#contacts" className="btn btn-primary mt-7">Записаться на продлёнку</a>
            </div>
            <div
              className="min-h-[220px] grid place-items-center text-[7rem]"
              style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-pink))" }}
            >
              🎒
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.06}>
              <TiltCard className="card h-full p-7 relative overflow-hidden">
                <span
                  className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-15"
                  style={{ background: p.color }}
                />
                <div className="text-5xl mb-4">{p.emoji}</div>
                <h3 className="font-display font-bold text-xl text-ink mb-2">{p.title}</h3>
                <p className="text-ink-soft font-medium leading-relaxed mb-4">{p.text}</p>
                <span
                  className="inline-block text-sm font-extrabold px-3 py-1.5 rounded-full text-white"
                  style={{ background: p.color }}
                >
                  {p.age}
                </span>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <p className="text-ink-soft font-semibold text-lg mb-5">
            А также: <b className="text-ink">музыка и вокал</b>, <b className="text-ink">нейрогимнастика</b> и{" "}
            <b className="text-ink">группа неполного дня (мини-сад)</b>.
          </p>
          <a href="#contacts" className="btn btn-primary btn-lg">Подобрать программу ребёнку</a>
        </Reveal>
      </div>
    </section>
  );
}
