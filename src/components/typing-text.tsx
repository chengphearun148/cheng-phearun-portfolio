import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TypingText({
  phrases,
  className,
}: {
  phrases: string[];
  className?: string;
}) {
  const list = phrases.length ? phrases : ["Developer"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(list[0] ?? "");
      return;
    }
    const current = list[index % list.length] ?? "";
    const pause = deleting && text === "" ? 400 : !deleting && text === current ? 1400 : 0;
    const speed = deleting ? 36 : 64;
    const t = window.setTimeout(() => {
      if (pause) {
        if (!deleting && text === current) setDeleting(true);
        else if (deleting && text === "") {
          setDeleting(false);
          setIndex((i) => (i + 1) % list.length);
        }
        return;
      }
      setText((prev) =>
        deleting ? current.slice(0, Math.max(0, prev.length - 1)) : current.slice(0, prev.length + 1),
      );
    }, pause || speed);
    return () => window.clearTimeout(t);
  }, [deleting, index, list, text]);

  return (
    <span className={cn("font-medium text-accent", className)}>
      {text}
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-accent align-baseline"
        style={{ animation: "caret 1s steps(1) infinite" }}
        aria-hidden
      />
    </span>
  );
}
