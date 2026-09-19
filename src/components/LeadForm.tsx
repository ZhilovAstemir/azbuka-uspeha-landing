"use client";

import { useState } from "react";
import { Icon } from "./Icon";

const programs = [
  "Продлёнка", "Подготовка к школе", "Английский для младших", "Английский для старшеклассников",
  "Программирование", "Шахматы", "Скорочтение", "Каллиграфия", "Театр и творчество", "Нейроупражнения", "Ещё не решили",
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
      <div className="card p-10 text-center">
        <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-teal/15 text-teal mb-5">
          <Icon name="check" className="w-7 h-7" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-semibold text-xl text-ink mb-2">Спасибо! Заявка отправлена</h3>
        <p className="text-ink-soft">Мы перезвоним, ответим на вопросы и подберём удобное расписание.</p>
        <button className="btn btn-outline mt-7" onClick={() => setSent(false)}>Отправить ещё одну</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-9" noValidate>
      <h3 className="font-display font-semibold text-xl text-ink">Оставить заявку</h3>
      <p className="text-ink-soft text-sm mt-1.5 mb-7">Перезвоним и ответим на все вопросы.</p>

      <label className="block mb-4">
        <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-ink-soft mb-2">Ваше имя</span>
        <input name="name" required placeholder="Как вас зовут?" className="input" />
      </label>

      <label className="block mb-4">
        <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-ink-soft mb-2">Телефон</span>
        <input name="phone" type="tel" required inputMode="tel" placeholder="+7 (___) ___-__-__" className="input" />
      </label>

      <label className="block mb-7">
        <span className="block text-xs font-semibold tracking-[0.08em] uppercase text-ink-soft mb-2">Направление</span>
        <select name="program" required defaultValue="" className="input">
          <option value="" disabled hidden>Выберите направление</option>
          {programs.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={loading} className="btn btn-primary btn-lg btn-block disabled:opacity-70">
        {loading ? "Отправляем…" : "Записаться"}
      </button>
      <p className="text-xs text-ink-soft mt-4 text-center leading-relaxed">
        Нажимая кнопку, вы даёте согласие на обработку персональных данных в соответствии с{" "}
        <a href="/privacy" target="_blank" className="text-brand underline">политикой конфиденциальности</a>.
      </p>
    </form>
  );
}
