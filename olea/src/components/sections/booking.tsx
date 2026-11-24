import { Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ReservationForm } from "@/components/booking/reservation-form";
import { site } from "@/lib/site";

export function Booking() {
  return (
    <section id="booking" className="bg-ink text-paper">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="label flex items-baseline gap-3 text-paper/55">
                <span className="text-paper">05</span>
                Бронь
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h2 mt-7 text-paper">
                Оставьте
                <br />
                вечер за собой
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-paper/65">
                Столы принимаем на два часа. Если планируете задержаться — напишите в комментарии,
                найдём место у бара.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-9 border-t border-paper/15 pt-6">
              <p className="label text-[0.5rem] text-paper/45">Если удобнее голосом</p>
              <a
                href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                className="mt-2 inline-flex items-center gap-2 text-[1.0625rem] text-paper transition-colors hover:text-[#e7b39a]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
              <p className="mt-4 text-[0.75rem] leading-relaxed text-paper/45">
                {site.hours[0].days}: {site.hours[0].time}. Понедельник — выходной, но форма
                работает всегда.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
            <div className="bg-paper p-6 text-ink md:p-8">
              <div className="flex items-baseline justify-between border-b border-line pb-4">
                <p className="label text-muted">Стол на вечер</p>
                <p className="label text-[0.4375rem] text-muted">01 / 01</p>
              </div>
              <div className="mt-6">
                <ReservationForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
