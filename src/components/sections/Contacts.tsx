import { site } from "@/lib/content";
import { Reveal } from "../Reveal";
import { LeadForm } from "../LeadForm";
import { Icon } from "../Icon";

const rows = [
  { icon: "pin", label: "Адрес", value: site.address },
  { icon: "phone", label: "Телефон", value: site.phone, href: `tel:${site.phoneHref}` },
  { icon: "message", label: "WhatsApp", value: site.phone, href: site.socials.whatsapp, external: true },
];

export function Contacts() {
  return (
    <section id="contacts" className="relative py-20 sm:py-28 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-32 -left-20 w-[480px] h-[480px] rounded-full bg-brand/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 w-[420px] h-[420px] rounded-full bg-accent/15 blur-3xl" />

      <div className="container-x relative grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-20 items-center">
        <Reveal>
          <span className="eyebrow !text-white/70">09 — Запишитесь сегодня</span>
          <h2 className="h-display mt-5 text-[clamp(1.7rem,3.6vw,2.6rem)]">
            Забронируйте место на продлёнке со скидкой 20%
          </h2>
          <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-md">
            Скидка — первым 10 записавшимся. Оставьте заявку, и мы перезвоним, ответим на вопросы
            и подберём удобное расписание.
          </p>

          <ul className="mt-10 space-y-5">
            {rows.map((r) => (
              <li key={r.label} className="flex items-start gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/10 shrink-0">
                  <Icon name={r.icon} className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.12em] uppercase text-white/50">{r.label}</span>
                  {r.href ? (
                    <a
                      href={r.href}
                      target={r.external ? "_blank" : undefined}
                      rel={r.external ? "noopener noreferrer" : undefined}
                      className="block mt-1 font-medium hover:text-sun"
                    >
                      {r.value}
                    </a>
                  ) : (
                    <span className="block mt-1 font-medium">{r.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Icon name="message" className="w-4 h-4" /> Написать в WhatsApp
            </a>
            <a href={`tel:${site.phoneHref}`} className="btn btn-outline !text-white !border-white/25 hover:!border-white">
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
