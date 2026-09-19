export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <a href="#hero" className="flex items-center gap-2.5 shrink-0" aria-label="Азбука Успеха — на главную">
      <span
        className="grid place-items-center w-10 h-10 rounded-2xl text-white text-2xl font-display font-bold shadow-[var(--shadow-brand)]"
        style={{ background: "linear-gradient(135deg,var(--color-brand),var(--color-pink))" }}
      >
        А
      </span>
      <span
        className={`font-display font-medium leading-none text-[0.95rem] ${footer ? "text-white" : "text-ink"}`}
      >
        Азбука
        <br />
        <b className="font-bold">Успеха</b>
      </span>
    </a>
  );
}
