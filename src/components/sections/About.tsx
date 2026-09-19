import { stats } from "@/lib/content";
import { SectionHead } from "../SectionHead";
import { Reveal } from "../Reveal";
import { Counter } from "../Counter";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="container-x grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Медиа-коллаж (замените эмодзи на реальные фото центра) */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/3] max-w-lg mx-auto">
            <div className="absolute inset-0 rounded-[2rem] grid place-items-center text-[7rem] shadow-[var(--shadow-soft)] animate-floaty"
              style={{ background: "linear-gradient(135deg,#ffe3ef,#fff2d6)" }}>
              🌈
            </div>
            <div className="absolute -right-4 -top-6 w-28 h-28 rounded-3xl grid place-items-center text-4xl shadow-[var(--shadow-soft)] bg-white animate-floaty [animation-delay:-1.5s]">
              🚀
            </div>
            <div className="absolute -left-5 bottom-8 w-24 h-24 rounded-3xl grid place-items-center text-4xl shadow-[var(--shadow-soft)] bg-white animate-floaty [animation-delay:-3s]">
              🎈
            </div>
            <div className="absolute right-6 -bottom-5 px-4 py-2 rounded-full bg-brand text-white font-extrabold shadow-[var(--shadow-brand)]">
              С заботой ❤️
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHead
            center={false}
            eyebrow="О центре «Азбука Успеха»"
            title={<>Место, где детство становится <span className="grad-text">стартом в успех</span></>}
          />
          <div className="-mt-6">
            <p className="text-ink-soft font-semibold text-lg leading-relaxed">
              Мы верим: каждый ребёнок талантлив. Наша задача — раскрыть эти таланты, привить любовь
              к знаниям и подарить уверенность в себе. Мы создали живое офлайн-пространство, куда дети
              бегут с радостью, а родители спокойны за результат.
            </p>
            <ul className="mt-6 space-y-2 font-semibold text-ink">
              <li>✅ Авторские методики и современные материалы</li>
              <li>✅ Тёплое и внимательное отношение к каждому</li>
              <li>✅ Прозрачный прогресс и обратная связь родителям</li>
            </ul>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-3xl sm:text-4xl grad-text">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-sm font-bold text-ink-soft mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
