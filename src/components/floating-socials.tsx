import type { SocialLink } from "@/lib/portfolio-types";
import { SocialIcon } from "@/components/social-icon";

export function FloatingSocials({ social }: { social: SocialLink[] }) {
  const items = social.filter((s) => s.url);
  if (!items.length) return null;
  return (
    <div className="pointer-events-none fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
      {items.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          className="pointer-events-auto grid size-11 place-items-center rounded-full border border-border bg-bg-elevated/80 text-muted backdrop-blur-md hover:text-fg"
        >
          <SocialIcon platform={s.platform} className="size-4" />
        </a>
      ))}
    </div>
  );
}
