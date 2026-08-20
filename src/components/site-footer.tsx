import { ArrowUp } from "lucide-react";
import type { SocialLink } from "@/lib/portfolio-types";
import { SocialIcon } from "@/components/social-icon";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter({
  name,
  role,
  social,
}: {
  name: string;
  role: string;
  social: SocialLink[];
}) {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-violet font-display text-sm font-bold text-white">
              CP
            </span>
            <span className="font-display font-semibold tracking-tight">{name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{role}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-fg">Quick Links</p>
          <ul className="mt-3 space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-muted hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-fg">Connect With Me</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {social
              .filter((s) => s.url)
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-border text-muted hover:text-fg"
                >
                  <SocialIcon platform={s.platform} className="size-4" />
                </a>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 lg:items-end">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid size-11 place-items-center rounded-full bg-linear-to-br from-accent to-violet text-white"
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
