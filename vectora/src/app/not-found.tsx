import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="shell flex min-h-[72vh] flex-col justify-center py-20">
        <p className="mono text-lime">{/* error 404 */}</p>
        <h1 className="display mt-5 max-w-[16ch]">Такого маршрута нет</h1>
        <p className="lead mt-5 max-w-md">
          Система не нашла страницу по этому адресу. Вернитесь к началу — там решения, проекты и
          форма обсуждения.
        </p>
        <Link href="/" className="btn btn-primary mt-8 w-fit">
          <ArrowLeft className="size-4" aria-hidden="true" />
          На главную
        </Link>
      </div>
    </section>
  );
}
