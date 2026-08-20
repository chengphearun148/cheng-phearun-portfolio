import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/lib/portfolio-types";
import { Section } from "@/components/section";
import { SkillIcon } from "@/components/skill-icon";
import { Reveal } from "@/components/reveal";

export function Skills({ skills }: { skills: Skill[] }) {
  return (
    <Section
      id="skills"
      eyebrow="My Skills"
      title="Programming Skills"
      action={
        <a href="/#skills" className="text-sm text-muted hover:text-fg">
          View All Skills
        </a>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {skills.map((skill, i) => (
          <Reveal key={skill.id} delay={i * 70}>
            <SkillCard skill={skill} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(skill.percentage);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setValue(skill.percentage);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [skill.percentage]);

  return (
    <div ref={ref} className="glass glow-card rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <SkillIcon name={skill.name} icon={skill.icon} />
          <div>
            <p className="font-medium text-fg">{skill.name}</p>
            <p className="text-xs text-subtle">{skill.category} Language</p>
          </div>
        </div>
        <p className="font-display text-lg font-semibold tabular-nums text-fg">{skill.percentage}%</p>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-subtle">
        <div
          className="h-full rounded-full bg-linear-to-r from-accent to-violet transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${value}%` }}
        />
      </div>
      {skill.description ? (
        <p className="mt-4 text-sm text-muted">{skill.description}</p>
      ) : null}
    </div>
  );
}
