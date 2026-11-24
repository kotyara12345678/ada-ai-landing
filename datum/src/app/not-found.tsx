import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section>
      <div className="shell flex min-h-[70vh] flex-col justify-center py-20">
        <p className="label text-cobalt">404 / страница не найдена</p>
        <h1 className="display mt-4 max-w-[14ch]">Такой метрики у нас нет</h1>
        <p className="lead mt-5 max-w-md">
          Адрес не совпал ни с одним разделом. Вернитесь к обзору продукта — там всё, что нужно.
        </p>
        <Link href="/" className="btn btn-primary mt-8 w-fit">
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </section>
  );
}
