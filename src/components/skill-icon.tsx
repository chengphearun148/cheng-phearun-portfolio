import { cn } from "@/lib/utils";

export function SkillIcon({
  name,
  icon,
  className,
}: {
  name: string;
  icon?: string | null;
  className?: string;
}) {
  const key = (icon || name).toLowerCase();
  if (key === "c" || key === "c-lang") {
    return (
      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl bg-accent/15 font-display text-lg font-bold text-accent",
          className,
        )}
      >
        C
      </span>
    );
  }
  if (key === "cpp" || key === "c++") {
    return (
      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl bg-violet/15 font-display text-sm font-bold text-violet",
          className,
        )}
      >
        C++
      </span>
    );
  }
  if (key === "java") {
    return (
      <span
        className={cn(
          "grid size-11 place-items-center rounded-xl bg-accent/10 font-display text-xs font-bold tracking-wide text-accent",
          className,
        )}
      >
        Java
      </span>
    );
  }
  return (
    <span
      className={cn(
        "grid size-11 place-items-center rounded-xl bg-bg-subtle font-display text-sm font-semibold text-fg",
        className,
      )}
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}
