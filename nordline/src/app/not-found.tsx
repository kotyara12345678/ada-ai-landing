import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-dark text-paper">
      <div className="shell flex h-20 items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="NORDLINE — на главную">
          <LogoMark className="h-8 w-8" />
          <span className="text-[1.05rem] font-extrabold tracking-[0.16em]">NORDLINE</span>
        </Link>
      </div>
      <div className="shell flex flex-1 flex-col justify-center pb-20">
        <span className="label text-accent">Ошибка 404</span>
        <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,6rem)]">
          Такого раздела нет
        </h1>
        <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-paper/70">
          Страница могла быть перемещена или удалена. Вернитесь на главную — там направления,
          каталог оборудования и форма запроса.
        </p>
        <Link href="/" className="btn btn-accent mt-10 w-fit">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </main>
  );
}
