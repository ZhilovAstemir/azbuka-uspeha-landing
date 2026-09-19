import { site } from "@/lib/content";
import { Logo } from "../Logo";

const cols = [
  {
    title: "Направления",
    links: ["Продлёнка", "Подготовка к школе", "Английский язык", "Программирование", "Шахматы и скорочтение"].map((t) => ({ label: t, href: "/#programs" })),
  },
  {
    title: "Центр",
    links: [
      { label: "О нас", href: "/#about" },
      { label: "Педагоги", href: "/#teachers" },
      { label: "Форматы", href: "/#prices" },
      { label: "Отзывы", href: "/#reviews" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0f1526] text-white/70">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] py-16">
        <div>
          <Logo footer />
          <p className="mt-5 text-sm leading-relaxed max-w-xs">
            {site.tagline}. {site.motto}. Дети {site.ages}, очные занятия и продлёнка.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-white/50 mb-5">{c.title}</h4>
            <ul className="space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-xs font-semibold tracking-[0.14em] uppercase text-white/50 mb-5">Контакты</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:${site.phoneHref}`} className="text-white font-semibold hover:text-sun transition-colors">{site.phone}</a></li>
            <li><a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: {site.phone}</a></li>
            <li>{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs">
          <span>© {new Date().getFullYear()} «{site.name}», {site.city} · {site.legal.operator}, ИНН {site.legal.inn}</span>
          <a href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
