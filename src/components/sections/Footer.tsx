import { site } from "@/lib/content";
import { Logo } from "../Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 border-t border-white/10">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4 py-14">
        <div>
          <Logo footer />
          <p className="mt-4 text-sm leading-relaxed max-w-xs">
            Центр детского развития. Растим умных, уверенных и счастливых детей с 1 до 12 лет.
            Очные занятия и продлёнка.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Программы</h4>
          <ul className="space-y-2 text-sm">
            {["Раннее развитие", "Подготовка к школе", "Английский язык", "Продлёнка"].map((t) => (
              <li key={t}><a href="#programs" className="hover:text-white transition-colors">{t}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Центр</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
            <li><a href="#teachers" className="hover:text-white transition-colors">Педагоги</a></li>
            <li><a href="#prices" className="hover:text-white transition-colors">Цены</a></li>
            <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={`tel:${site.phoneHref}`} className="hover:text-white transition-colors">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white transition-colors">{site.email}</a></li>
            <li>{site.address}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-sm">
          <span>© {new Date().getFullYear()} «{site.name}». Все права защищены.</span>
          <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
