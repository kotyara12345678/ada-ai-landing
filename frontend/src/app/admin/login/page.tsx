"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";
import { AdminApiError, fetchSession, login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  // Уже вошедшему не нужно видеть форму
  useEffect(() => {
    fetchSession()
      .then(() => router.replace("/admin"))
      .catch(() => undefined);
  }, [router]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      await login(email.trim(), password);
      router.replace("/admin");
    } catch (caught) {
      if (caught instanceof AdminApiError) {
        setError(caught.status === 401 ? "Неверная почта или пароль" : caught.message);
      } else {
        setError("Сервер недоступен. Попробуйте ещё раз.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-[0.8rem] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          На сайт
        </Link>

        <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_20px_50px_-40px_rgba(10,15,26,0.5)] sm:p-7">
          <span className="flex size-10 items-center justify-center rounded-xl bg-ink-deep text-lime">
            <LockKeyhole className="size-4.5" aria-hidden />
          </span>
          <h1 className="mt-4 font-display text-[1.35rem] font-semibold tracking-tight text-ink">
            Админ-панель
          </h1>
          <p className="mt-1 text-[0.82rem] text-ink-muted">Заявки с сайта ADA</p>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3.5">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] font-medium text-ink">Почта</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-11 rounded-lg border border-line bg-surface px-3 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] font-medium text-ink">Пароль</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="h-11 rounded-lg border border-line bg-surface px-3 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand"
              />
            </label>

            {error ? (
              <p className="rounded-lg bg-[#fdecec] px-3 py-2 text-[0.8rem] text-[#b42525]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-ink-deep text-[0.88rem] font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
            >
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              Войти
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[0.74rem] text-ink-muted">
          Доступ только для администратора сайта
        </p>
      </div>
    </div>
  );
}
