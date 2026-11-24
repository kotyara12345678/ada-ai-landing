import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section>
      <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
        <p className="label text-clay">404 / такой страницы нет</p>
        <h1 className="display mt-5 max-w-[15ch]">Здесь только сервировка</h1>
        <p className="lead mt-5 max-w-md">
          Страница не нашлась. Вернитесь к началу — там меню, бронь и адрес.
        </p>
        <Link href="/" className="btn btn-primary mt-8 w-fit">
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </section>
  );
}
