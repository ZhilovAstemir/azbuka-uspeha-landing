import Image from "next/image";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="/" className="flex items-center gap-2.5 min-w-0" aria-label="Азбука успеха — на главную">
      <Image
        src="/images/avatar.jpg"
        alt="Логотип «Азбука успеха»"
        width={96}
        height={96}
        className="rounded-full shadow-[var(--shadow-soft)] bg-white w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] shrink-0 object-cover"
        priority
      />
      <span
        className={`font-display font-medium leading-none text-[14px] sm:text-[16px] whitespace-nowrap ${footer ? "text-white" : "text-ink"}`}
      >
        Азбука
        <br />
        <b className="font-bold">успеха</b>
      </span>
    </a>
  );
}
