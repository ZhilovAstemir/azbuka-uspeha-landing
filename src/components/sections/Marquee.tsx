const items = [
  "Продлёнка", "Подготовка к школе", "Английский язык", "Программирование", "Шахматы",
  "Скорочтение", "Каллиграфия", "Театр и творчество", "Нейроупражнения", "Нальчик, Атажукина 18",
];

/** Тонкая бегущая строка направлений между героем и первой секцией. */
export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-white py-4 select-none" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 text-sm font-medium tracking-wide text-ink/70 uppercase whitespace-nowrap">
            {t}
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
