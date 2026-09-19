import { site } from "@/lib/content";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 border-t border-white/10">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4 py-14">
        <div>
          <Logo footer />
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            {site.tagline}. {site.motto}. Дети {site.ages}, очные занятия и продлёнка.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Направления</h4>
          <ul className="space-y-2 text-sm">
            {["Продлёнка", "Подготовка к школе", "Английский язык", "Шахматы и скорочтение", "Нейроупражнения"].map((t) => (
              <li key={t}><a href="#programs" className="hover:text-white transition-colors">{t}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Центр</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
            <li><a href="#teachers" className="hover:text-white transition-colors">Педагоги</a></li>
            <li><a href="#prices" className="hover:text-white transition-colors">Форматы</a></li>
            <li><a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Мы в Instagram</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-white transition-colors">{site.phone}</a></li>
            <li>{site.address}</li>
            <li><a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{site.instagramHandle}</a></li>
            <li><a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-sm">
          <span>© {new Date().getFullYear()} «{site.name}», {site.city}. Все права защищены.</span>
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
