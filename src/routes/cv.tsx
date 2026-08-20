import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio.functions";
import { profileImageSrc } from "@/lib/portfolio-types";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cv")({
  loader: () => getPortfolio(),
  component: CvPage,
});

function CvPage() {
  const data = Route.useLoaderData();
  const { profile, skills, projects, education, social } = data;
  const photo = profileImageSrc(profile);

  return (
    <main className="min-h-[100dvh] bg-bg px-4 py-8 text-fg">
      <div className="mx-auto flex max-w-3xl items-center justify-between print:hidden">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft /> Back
          </Link>
        </Button>
        <Button variant="gradient" size="sm" onClick={() => window.print()}>
          <Download /> Save as PDF
        </Button>
      </div>
      <article className="mx-auto mt-6 max-w-3xl rounded-2xl border border-border bg-bg-elevated p-8 print:mt-0 print:border-0 print:p-0">
        <header className="flex items-start gap-5 border-b border-border pb-6">
          {photo ? (
            <img
              src={photo}
              alt=""
              className="size-20 rounded-2xl object-cover object-[center_12%] outline outline-1 -outline-offset-1 outline-white/10"
            />
          ) : null}
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-1 text-muted">{profile.role}</p>
            <p className="mt-1 text-sm text-subtle">{profile.location}</p>
          </div>
        </header>
        <section className="mt-6">
          <h2 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Profile
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{profile.bio}</p>
        </section>
        <section className="mt-6">
          <h2 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Skills
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {skills.map((s) => (
              <li key={s.id}>
                <span className="font-medium">{s.name}</span>
                <span className="text-muted"> — {s.percentage}%</span>
                {s.description ? (
                  <span className="text-subtle"> · {s.description}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Projects
          </h2>
          <ul className="mt-2 space-y-3">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-muted">{p.description}</p>
                <p className="text-xs text-subtle">{p.technologies.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-6">
          <h2 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            Education
          </h2>
          <ul className="mt-2 space-y-3">
            {education.map((e) => (
              <li key={e.id}>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-muted">
                  {e.institution} · {e.period}
                </p>
                <p className="text-sm text-subtle">{e.description}</p>
              </li>
            ))}
          </ul>
        </section>
        {social.some((s) => s.url) ? (
          <section className="mt-6">
            <h2 className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              Links
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              {social
                .filter((s) => s.url)
                .map((s) => (
                  <li key={s.id}>
                    {s.label}: {s.url}
                  </li>
                ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
