import Image from "next/image";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Азбука успеха — на главную">
      <Image
        src="/images/avatar.jpg"
        alt="Логотип «Азбука успеха»"
        width={44}
        height={44}
        className="rounded-full shadow-[var(--shadow-soft)]"
        priority
      />
      <span
        className={`font-display font-medium leading-none text-[0.95rem] ${footer ? "text-white" : "text-ink"}`}
      >
        Азбука
        <br />
        <b className="font-bold">успеха</b>
      </span>
    </a>
  );
}
