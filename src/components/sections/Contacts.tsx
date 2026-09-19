import { site } from "@/lib/content";
import { Reveal } from "../Reveal";
import { LeadForm } from "../LeadForm";

export function Contacts() {
  return (
    <section id="contacts" className="relative py-20 sm:py-28 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-20 -left-10 w-96 h-96 rounded-full bg-brand/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-pink/30 blur-3xl animate-blob [animation-delay:-5s]" />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="eyebrow !bg-white/15 !text-white">Запишитесь сегодня</span>
          <h2 className="mt-4 font-display font-bold text-[clamp(1.9rem,4vw,3rem)] leading-tight">
            Забронируйте место на продлёнке со скидкой 20% 🎒
          </h2>
          <p className="mt-4 text-lg font-semibold text-white/85 max-w-md">
            Скидка — первым 10 записавшимся. Оставьте заявку, и мы перезвоним, ответим на вопросы
            и подберём удобное расписание.
          </p>

          <ul className="mt-8 space-y-3 font-semibold">
            <li className="flex gap-3"><span>📍</span> {site.address}</li>
            <li className="flex gap-3"><span>📞</span> <a href={`tel:${site.phoneHref}`} className="hover:text-sun">{site.phone}</a></li>
            <li className="flex gap-3"><span>💬</span> <span>Слово «{site.codeWord}» в Direct <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-sun underline decoration-white/40">{site.instagramHandle}</a></span></li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors">
              WhatsApp
            </a>
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors">
              Instagram
            </a>
            <a href={`tel:${site.phoneHref}`} className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors">
              Позвонить
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-ink">
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
