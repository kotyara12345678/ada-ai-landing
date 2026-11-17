import type { Project } from "@/config/portfolio";
import { cn } from "@/lib/utils";

/**
 * Абстрактная схема интерфейса проекта (не скриншот реального продукта).
 * Alt-текст описывает именно схему, чтобы не вводить посетителя в заблуждение.
 */
export function ProjectPreview({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-muted/20 bg-forest/70",
        className,
      )}
      role="img"
      aria-label={`Схема интерфейса проекта ${project.name} ${project.subtitle}`}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-muted/15 px-3">
        <span className="size-1.5 rounded-full bg-muted/30" />
        <span className="size-1.5 rounded-full bg-muted/30" />
        <span className="size-1.5 rounded-full bg-muted/30" />
        <span className="ml-2 h-3 w-24 rounded-sm bg-muted/10" />
      </div>

      <div className="grid h-[calc(100%-2rem)] grid-cols-[72px_1fr]">
        <div className="border-r border-muted/15 p-2.5">
          {[0, 1, 2, 3, 4].map((row) => (
            <div
              key={row}
              className={cn("mb-2 h-2 rounded-sm", row === 0 ? "w-10" : "w-8 bg-muted/15")}
              style={row === 0 ? { backgroundColor: project.accent, opacity: 0.7 } : undefined}
            />
          ))}
        </div>

        <div className="p-3">
          {project.preview === "document" ? (
            <div className="grid h-full grid-cols-[1.2fr_1fr] gap-2.5">
              <div className="space-y-2">
                <div className="h-2.5 w-2/3 rounded-sm bg-muted/25" />
                <div className="h-1.5 w-full rounded-sm bg-muted/10" />
                <div className="h-1.5 w-11/12 rounded-sm bg-muted/10" />
                <div className="h-1.5 w-4/5 rounded-sm bg-muted/10" />
                <div
                  className="mt-3 h-10 rounded-md border"
                  style={{ borderColor: `${project.accent}55`, backgroundColor: `${project.accent}14` }}
                />
                <div className="h-1.5 w-full rounded-sm bg-muted/10" />
                <div className="h-1.5 w-3/4 rounded-sm bg-muted/10" />
              </div>
              <div className="space-y-1.5 rounded-md border border-muted/15 p-2">
                <div className="font-mono text-[0.5rem] uppercase tracking-wider text-muted/60">source</div>
                {[0, 1, 2].map((row) => (
                  <div key={row} className="rounded-sm border border-muted/10 p-1.5">
                    <div className="h-1 w-full rounded-sm bg-muted/15" />
                    <div className="mt-1 h-1 w-2/3 rounded-sm bg-muted/10" />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.preview === "network" ? (
            <div className="relative h-full">
              <div className="absolute inset-0 grid grid-cols-3 gap-2">
                {[0, 1, 2, 3, 4, 5].map((node) => (
                  <div
                    key={node}
                    className="flex items-center gap-1.5 rounded-md border border-muted/15 bg-graphite/40 px-1.5"
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{
                        backgroundColor: node < 4 ? project.accent : "rgba(155,170,161,0.4)",
                        opacity: node < 4 ? 0.9 : 1,
                      }}
                    />
                    <span className="h-1 w-full rounded-sm bg-muted/15" />
                  </div>
                ))}
              </div>
              <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
                <line x1="15%" y1="30%" x2="85%" y2="70%" stroke="rgba(63,169,245,0.5)" strokeWidth="0.5" />
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(63,169,245,0.35)" strokeWidth="0.5" />
              </svg>
            </div>
          ) : null}

          {project.preview === "voice" ? (
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="size-6 rounded-full" style={{ backgroundColor: `${project.accent}25` }} />
                <div className="space-y-1">
                  <div className="h-1.5 w-16 rounded-sm bg-muted/25" />
                  <div className="h-1 w-10 rounded-sm bg-muted/10" />
                </div>
              </div>
              <div className="flex h-12 items-center gap-[3px]">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    className="w-full rounded-sm"
                    style={{
                      height: `${20 + Math.abs(Math.sin(index * 0.7)) * 70}%`,
                      backgroundColor: project.accent,
                      opacity: 0.15 + (index % 5) * 0.12,
                    }}
                  />
                ))}
              </div>
              <div className="space-y-1.5">
                <div className="h-1.5 w-3/4 rounded-sm bg-muted/15" />
                <div className="h-1.5 w-1/2 rounded-sm bg-muted/10" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
