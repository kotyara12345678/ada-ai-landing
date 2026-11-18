import { Code2, Layers, LifeBuoy, ReceiptText } from "lucide-react";

const items = [
  {
    icon: ReceiptText,
    title: "Смета до старта",
    text: "Объём работ и цена фиксируются в договоре. Без «уточним по ходу».",
  },
  {
    icon: Code2,
    title: "Код у вас",
    text: "Передаём исходники, доступы и документацию. Проект не привязан к нам.",
  },
  {
    icon: Layers,
    title: "Одна команда",
    text: "Дизайн, разработка, серверы и поддержка — без посредников и потери контекста.",
  },
  {
    icon: LifeBuoy,
    title: "После запуска",
    text: "Мониторинг, резервные копии и обновления по тарифу от 1 490 ₽/мес.",
  },
];

export function Advantages() {
  return (
    <section className="border-y border-line bg-surface-muted">
      <div className="container-page grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-3.5 px-0 py-4 sm:py-6 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-ink text-lime">
              <Icon className="size-4" aria-hidden />
            </span>
            <div>
              <p className="text-[0.92rem] font-semibold text-ink">{title}</p>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
