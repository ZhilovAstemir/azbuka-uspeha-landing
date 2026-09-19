const items = [
  "🎨 Творчество", "🔤 Английский", "🧮 Ментальная арифметика", "📚 Подготовка к школе",
  "🤖 Робототехника", "🗣 Логопед", "♟ Шахматы", "🎵 Музыка", "🧩 Раннее развитие",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden py-5 bg-brand text-white select-none" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="mx-6 font-display font-bold text-lg whitespace-nowrap opacity-95">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
