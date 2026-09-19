import Image from "next/image";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-3 shrink-0" aria-label="Азбука успеха — на главную">
      <Image
        src="/images/avatar.jpg"
        alt="Логотип «Азбука успеха»"
        width={40}
        height={40}
        className="rounded-full ring-1 ring-line"
        priority
      />
      <span className={`font-display font-semibold text-[0.95rem] leading-none tracking-tight ${footer ? "text-white" : "text-ink"}`}>
        Азбука успеха
        <span className={`block mt-1 font-sans font-medium text-[0.68rem] tracking-[0.12em] uppercase ${footer ? "text-white/60" : "text-ink-soft"}`}>
          центр развития
        </span>
      </span>
    </a>
  );
}
