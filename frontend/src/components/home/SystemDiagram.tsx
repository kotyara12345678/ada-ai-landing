import { Check, Code2, LifeBuoy, Rocket } from "lucide-react";

const steps = [
  {
    icon: Code2,
    label: "Разработка",
    title: "Сайт, backend, AI-сервис",
    items: ["Прототип и архитектура", "Реализация и тесты"],
  },
  {
    icon: Rocket,
    label: "Запуск",
    title: "Развёртывание на сервере",
    items: ["Домен и HTTPS", "Резервные копии и мониторинг"],
  },
  {
    icon: LifeBuoy,
    label: "Сопровождение",
    title: "Техническая эксплуатация",
    items: ["Обновления и контроль SSL", "Реакция на инциденты"],
  },
];

export function SystemDiagram() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
            Цикл работы с продуктом
          </p>
          <p className="mt-1 font-display text-[1.02rem] font-semibold text-ink">
            От идеи до эксплуатации
          </p>
        </div>
        <span className="rounded-md bg-success-soft px-2.5 py-1 text-[0.7rem] font-medium text-success">
          полный цикл
        </span>
      </div>

      <ol className="mt-4">
        {steps.map((step, index) => (
          <li key={step.label} className="relative flex gap-4 pb-5 last:pb-0">
            {index < steps.length - 1 ? (
              <span
                className="absolute left-[1.1rem] top-10 h-[calc(100%-1.75rem)] w-px bg-line"
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-brand">
              <step.icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
            </span>
            <div className="min-w-0 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-[0.9rem] font-medium text-ink">{step.label}</p>
                <span className="text-[0.76rem] text-ink-muted">{step.title}</span>
              </div>
              <ul className="mt-1.5 flex flex-col gap-1">
                {step.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-[0.8rem] text-ink-muted">
                    <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3">
        <p className="text-[0.74rem] text-ink-muted">Поддержка — в рабочие часы по тарифу</p>
        <p className="text-[0.74rem] font-medium text-ink">без обещаний 24/7</p>
      </div>
    </div>
  );
}
