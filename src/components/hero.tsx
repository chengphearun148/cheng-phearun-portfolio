import { Link } from "@tanstack/react-router";
import { ArrowRight, Braces, Code2, Mail } from "lucide-react";
import type { PortfolioData } from "@/lib/portfolio-types";
import { profileImageSrc } from "@/lib/portfolio-types";
import { initials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "@/components/social-icon";
import { TypingText } from "@/components/typing-text";

export function Hero({ data }: { data: PortfolioData }) {
  const { profile, social, projects, skills } = data;
  const photo = profileImageSrc(profile);
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ") || "";

  return (
    <section id="home" className="relative overflow-hidden px-4 pt-24 pb-16 sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="order-2 lg:order-1">
          <p className="inline-flex items-center rounded-full border border-border bg-bg-elevated/70 px-3 py-1 text-xs font-medium text-muted backdrop-blur-md">
            Hello, I'm
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-fg">{first}</span>
            {last ? <span className="block text-glow">{last}</span> : null}
          </h1>
          <p className="mt-4 text-lg text-muted">{profile.tagline}</p>
          <p className="mt-2 text-sm text-subtle">
            <TypingText phrases={profile.typingPhrases} />
          </p>
          <p className="mt-5 max-w-lg text-muted">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild variant="gradient" size="lg">
              <a href="/#projects">
                View My Work
                <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/#contact">
                <Mail />
                Contact Me
              </a>
            </Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
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

        <div className="relative order-1 mx-auto w-full max-w-[15rem] sm:max-w-sm lg:order-2 lg:max-w-md">
          <div className="absolute top-6 left-2 hidden rounded-2xl border border-border bg-bg-elevated/80 p-3 text-accent shadow-sm backdrop-blur-md lg:block">
            <Code2 className="size-5" />
          </div>
          <div className="absolute top-24 right-0 hidden rounded-2xl border border-border bg-bg-elevated/80 p-3 text-violet shadow-sm backdrop-blur-md lg:block">
            <Braces className="size-5" />
          </div>
          <div className="relative mx-auto aspect-square w-full">
            <div className="absolute inset-[-6%] rounded-full border border-accent/30 motion-reduce:animate-none animate-spin [animation-duration:28s] lg:inset-[-8%]" />
            <div className="absolute inset-[-12%] hidden rounded-full border border-violet/20 motion-reduce:animate-none animate-spin [animation-duration:40s] [animation-direction:reverse] sm:block lg:inset-[-16%]" />
            <div className="absolute inset-0 overflow-hidden rounded-full bg-bg-subtle shadow-[0_0_60px_color-mix(in_oklab,var(--color-accent)_28%,transparent)] outline outline-1 -outline-offset-1 outline-white/10">
              {photo ? (
                <img
                  src={photo}
                  alt={profile.name}
                  className="size-full object-cover object-[center_12%]"
                />
              ) : (
                <div className="grid size-full place-items-center font-display text-5xl font-bold text-accent">
                  {initials(profile.name)}
                </div>
              )}
            </div>
          </div>
          <div className="relative z-10 mx-auto mt-5 max-w-xs rounded-2xl border border-border bg-bg-elevated/90 px-4 py-3 backdrop-blur-md lg:absolute lg:right-2 lg:bottom-4 lg:mt-0">
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <span className="size-2 rounded-full bg-success" />
              {profile.availabilityLabel}
            </p>
            <p className="mt-1 text-xs text-muted">{profile.availabilityDetail}</p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 rounded-2xl border border-border bg-bg-elevated/60 p-4 backdrop-blur-md sm:grid-cols-4">
        <Stat value={`${Math.max(projects.length, 1)}+`} label="Projects Completed" />
        <Stat value={String(skills.length)} label="Technologies" />
        <Stat value="Always" label="Learning" />
        <Stat value="100%" label="Dedication" />
      </div>

      <div className="sr-only">
        <Link to="/cv">CV</Link>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl px-3 py-3 text-center sm:text-left">
      <p className="font-display text-2xl font-semibold tracking-tight text-fg">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}
