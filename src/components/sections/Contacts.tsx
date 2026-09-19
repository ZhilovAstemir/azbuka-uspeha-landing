import { site } from "@/lib/content";
import { Reveal } from "../Reveal";
import { LeadForm } from "../LeadForm";

const socials = [
  { key: "whatsapp", label: "WhatsApp", href: site.socials.whatsapp },
  { key: "telegram", label: "Telegram", href: site.socials.telegram },
  { key: "instagram", label: "Instagram", href: site.socials.instagram },
  { key: "vk", label: "ВКонтакте", href: site.socials.vk },
];

export function Contacts() {
  return (
    <section id="contacts" className="relative py-20 sm:py-28 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-20 -left-10 w-96 h-96 rounded-full bg-brand/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-pink/30 blur-3xl animate-blob [animation-delay:-5s]" />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="eyebrow !bg-white/15 !text-white">Запишитесь сегодня</span>
          <h2 className="mt-4 font-display font-bold text-[clamp(1.9rem,4vw,3rem)] leading-tight">
            Подарите ребёнку бесплатное пробное занятие 🎁
          </h2>
          <p className="mt-4 text-lg font-semibold text-white/85 max-w-md">
            Оставьте заявку — перезвоним в течение 15 минут, ответим на вопросы и подберём удобное время.
          </p>

          <ul className="mt-8 space-y-3 font-semibold">
            <li className="flex gap-3"><span>📍</span> {site.address}</li>
            <li className="flex gap-3"><span>📞</span> <a href={`tel:${site.phoneHref}`} className="hover:text-sun">{site.phone}</a></li>
            <li className="flex gap-3"><span>✉️</span> <a href={`mailto:${site.email}`} className="hover:text-sun">{site.email}</a></li>
            <li className="flex gap-3"><span>🕐</span> {site.hours}</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 font-bold transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="text-ink">
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
