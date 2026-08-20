import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative inline-flex h-10 w-[4.5rem] items-center rounded-full border border-border bg-bg-subtle px-1",
        className,
      )}
    >
      <span
        className={cn(
          "absolute size-8 rounded-full bg-bg-elevated shadow-sm transition-transform duration-200 ease-out",
          theme === "light" ? "translate-x-0" : "translate-x-[2.35rem]",
        )}
      />
      <span className="relative z-10 grid size-8 place-items-center text-fg">
        <Sun className="size-3.5" />
      </span>
      <span className="relative z-10 grid size-8 place-items-center text-fg">
        <Moon className="size-3.5" />
      </span>
    </button>
  );
}
