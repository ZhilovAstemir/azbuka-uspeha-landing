import { site } from "@/lib/content";
import { Reveal } from "../Reveal";
import { LeadForm } from "../LeadForm";
import { Icon } from "../Icon";

export function Contacts() {
  return (
    <section id="contacts" className="relative py-20 sm:py-28 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-20 -left-10 w-96 h-96 rounded-full bg-brand/40 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-pink/30 blur-3xl animate-blob [animation-delay:-5s]" />

      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="eyebrow !bg-white/15 !text-white">Запишитесь сегодня</span>
          <h2 className="mt-4 font-display font-bold text-[clamp(1.9rem,4vw,3rem)] leading-tight">
            Забронируйте место на продлёнке со скидкой 20%
          </h2>
          <p className="mt-4 text-lg font-semibold text-white/85 max-w-md">
            Оставьте заявку, и мы перезвоним, ответим на вопросы
            и подберём удобное расписание.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              { icon: "pin", label: "Адрес", value: site.address },
              { icon: "phone", label: "Телефон", value: site.phone, href: `tel:${site.phoneHref}` },
              { icon: "whatsapp", label: "WhatsApp", value: site.phone, href: site.socials.whatsapp, external: true },
            ].map((r) => (
              <li key={r.label} className="flex items-center gap-4">
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-white/10 shrink-0">
                  <Icon name={r.icon} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-white/50">{r.label}</span>
                  {r.href ? (
                    <a href={r.href} target={r.external ? "_blank" : undefined} rel={r.external ? "noopener noreferrer" : undefined} className="font-bold hover:text-sun">
                      {r.value}
                    </a>
                  ) : (
                    <span className="font-bold">{r.value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              <Icon name="whatsapp" className="w-4 h-4" strokeWidth={2} /> Написать в WhatsApp
            </a>
            <a href={`tel:${site.phoneHref}`} className="btn btn-ghost">
              <Icon name="phone" className="w-4 h-4" strokeWidth={2} /> Позвонить
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
