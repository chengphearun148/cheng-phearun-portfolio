import { createFileRoute } from "@tanstack/react-router";
import { getPortfolio } from "@/lib/portfolio.functions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Education } from "@/components/education";
import { ContactForm } from "@/components/contact-form";
import { CvBanner } from "@/components/cv-banner";
import { FloatingSocials } from "@/components/floating-socials";
import { Particles } from "@/components/particles";

export const Route = createFileRoute("/")({
  loader: () => getPortfolio(),
  component: HomePage,
  pendingComponent: HomePending,
});

function HomePending() {
  return (
    <main className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-6xl px-4 pt-32">
        <div className="h-12 w-64 animate-pulse rounded-lg bg-bg-subtle" />
        <div className="mt-4 h-8 w-96 max-w-full animate-pulse rounded-lg bg-bg-subtle" />
      </div>
    </main>
  );
}

function HomePage() {
  const data = Route.useLoaderData();
  return (
    <div className="page-in min-h-[100dvh] bg-bg text-fg">
      <Particles />
      <SiteHeader />
      <FloatingSocials social={data.social} />
      <main>
        <Hero data={data} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Education items={data.education} />
        <CvBanner name={data.profile.name} />
        <ContactForm profile={data.profile} social={data.social} />
      </main>
      <SiteFooter
        name={data.profile.name}
        role={data.profile.tagline}
        social={data.social}
      />
    </div>
  );
}
