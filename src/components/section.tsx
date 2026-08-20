import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  action,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-4 py-16 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
              {eyebrow}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {title}
            </h2>
          </div>
          {action}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
