const companies = ["NORTHWIND", "KRAFT", "LOOM", "MERIDIAN", "OCTAVA", "RIDGE"];

export function Logos() {
  return (
    <section aria-label="Клиенты" className="border-b border-line bg-paper">
      <div className="shell flex flex-col gap-5 py-8 md:flex-row md:items-center md:gap-10 md:py-9">
        <p className="label shrink-0 text-[0.625rem] text-muted">С нами считают</p>
        <ul className="fade-mask flex flex-wrap items-center gap-x-8 gap-y-3 md:justify-between md:gap-x-6 lg:flex-1">
          {companies.map((company) => (
            <li
              key={company}
              className="font-display text-[0.8125rem] font-bold tracking-[0.16em] text-ink/35 transition-colors hover:text-ink/60"
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
