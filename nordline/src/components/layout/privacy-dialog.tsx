"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { company } from "@/lib/content";

export function PrivacyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left text-[0.75rem] text-paper/50 underline decoration-paper/25 underline-offset-4 transition-colors hover:text-paper"
      >
        Политика конфиденциальности
      </button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy="privacy-title">
        <div className="p-6 pt-14 md:p-12">
          <span className="label text-accent">Документ-заглушка</span>
          <h2 id="privacy-title" className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            Политика конфиденциальности
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-graphite/70">
            <p>
              Это демонстрационный концепт. Реальная политика обработки персональных данных здесь
              не публикуется, а форма заявки не передаёт данные третьим лицам.
            </p>
            <p>
              При отправке формы имя, компания, контакт, направление интереса и комментарий
              сохраняются в локальном журнале демонстрационного проекта на сервере, где запущен
              сайт. Данные используются только для проверки работоспособности интерфейса.
            </p>
            <p>
              Для публикации в качестве реального сайта потребуется действующая политика,
              согласие на обработку персональных данных и указание оператора. Контакты компании{" "}
              {company.name} вымышлены.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
