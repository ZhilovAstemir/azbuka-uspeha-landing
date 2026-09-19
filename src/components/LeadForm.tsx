"use client";

import { useState } from "react";

const programs = [
  "Продлёнка", "Подготовка к школе", "Английский для младших", "Английский для старшеклассников",
  "Программирование", "Академия кибербезопасности", "Шахматы", "Скорочтение", "Каллиграфия", "Театр и творчество", "Нейроупражнения", "Ещё не решили",
];

export function LeadForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setLoading(true);

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // TODO: подключить реальную отправку заявки:
      // - свой API-роут (app/api/lead/route.ts) с отправкой в Telegram/на почту/CRM
      // - или сторонний сервис форм.
      // Пока просто имитируем успешную отправку и логируем данные.
      console.log("Заявка:", data);
      // Отправляем цель в аналитику, если она подключена
      const w = window as unknown as {
        ym?: (id: number, action: string, goal: string) => void;
        __ym_id?: number;
        gtag?: (action: string, event: string) => void;
      };
      if (w.ym && w.__ym_id) w.ym(w.__ym_id, "reachGoal", "lead");
      w.gtag?.("event", "generate_lead");
      await new Promise((r) => setTimeout(r, 600));
      setSent(true);
      form.reset();
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="font-display font-bold text-2xl text-ink mb-2">Спасибо! Заявка отправлена</h3>
        <p className="text-ink-soft font-semibold">Мы перезвоним, ответим на вопросы и подберём удобное расписание.</p>
        <button className="btn btn-ghost mt-6" onClick={() => setSent(false)}>
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-8" noValidate>
      <h3 className="font-display font-bold text-2xl text-ink mb-6">Оставить заявку</h3>

      <label className="block mb-4">
        <span className="block text-sm font-bold text-ink-soft mb-1.5">Ваше имя</span>
        <input
          name="name"
          required
          placeholder="Как вас зовут?"
          className="w-full rounded-2xl border-2 border-ink/10 focus:border-brand outline-none px-4 py-3 font-semibold transition-colors bg-white"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-sm font-bold text-ink-soft mb-1.5">Телефон</span>
        <input
          name="phone"
          type="tel"
          required
          inputMode="tel"
          placeholder="+7 (___) ___-__-__"
          className="w-full rounded-2xl border-2 border-ink/10 focus:border-brand outline-none px-4 py-3 font-semibold transition-colors bg-white"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-sm font-bold text-ink-soft mb-1.5">Направление</span>
        <select
          name="program"
          required
          defaultValue=""
          className="w-full rounded-2xl border-2 border-ink/10 focus:border-brand outline-none px-4 py-3 font-semibold transition-colors bg-white"
        >
          <option value="" disabled hidden>Выберите направление</option>
          {programs.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={loading} className="btn btn-primary btn-lg btn-block disabled:opacity-70">
        {loading ? "Отправляем…" : "Записаться"}
      </button>
      <p className="text-xs text-ink-soft mt-4 text-center font-medium">
        Нажимая кнопку, вы даёте согласие на обработку персональных данных в соответствии с{" "}
        <a href="/privacy" target="_blank" className="text-brand underline">политикой конфиденциальности</a>.
      </p>
    </form>
  );
}
