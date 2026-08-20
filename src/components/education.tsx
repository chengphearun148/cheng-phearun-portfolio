import type { EducationItem } from "@/lib/portfolio-types";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Education({ items }: { items: EducationItem[] }) {
  return (
    <Section id="education" eyebrow="Education" title="Learning journey">
      <ol className="relative space-y-6 border-l border-border pl-6">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 70}>
            <li className="relative">
              <span className="absolute top-1.5 -left-[1.91rem] size-3.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_12px_var(--color-accent)]" />
              <p className="text-xs font-medium tracking-wide text-accent uppercase">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.institution}</p>
              <p className="mt-2 max-w-2xl text-sm text-muted">{item.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
