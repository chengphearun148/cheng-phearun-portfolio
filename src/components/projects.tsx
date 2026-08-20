import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/portfolio-types";
import { projectImageSrc } from "@/lib/portfolio-types";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Projects({ projects }: { projects: Project[] }) {
  const techs = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) for (const t of p.technologies) set.add(t);
    return ["All", ...Array.from(set)];
  }, [projects]);
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.technologies.includes(filter));

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Things I've Built"
      action={
        <a href="/#projects" className="text-sm text-muted hover:text-fg">
          View All Projects
        </a>
      }
    >
      {techs.length > 2 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {techs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={
                t === filter
                  ? "rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-fg"
                  : "rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:text-fg"
              }
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={i * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const src = projectImageSrc(project);
  const github = project.githubUrl.trim();
  const live = project.liveUrl.trim();
  return (
    <article className="glass glow-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-16/10 overflow-hidden bg-bg-subtle">
        {src ? (
          <img
            src={src}
            alt=""
            className="size-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
          />
        ) : (
          <div className="grid size-full place-items-center text-subtle">No image</div>
        )}
        {project.technologies[0] ? (
          <span className="absolute top-3 right-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-medium text-fg backdrop-blur-md">
            {project.technologies[0]}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {github ? (
            <Button asChild variant="outline" size="sm">
              <a href={github} target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              <Github /> GitHub
            </Button>
          )}
          {live ? (
            <Button asChild variant="outline" size="sm">
              <a href={live} target="_blank" rel="noreferrer">
                Live Demo <ExternalLink />
              </a>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Live Demo <ExternalLink />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
