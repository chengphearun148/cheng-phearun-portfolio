import { MapPin, Sparkles, User } from "lucide-react";
import type { SiteProfile } from "@/lib/portfolio-types";
import { profileImageSrc } from "@/lib/portfolio-types";
import { initials } from "@/lib/utils";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function About({ profile }: { profile: SiteProfile }) {
  const photo = profileImageSrc(profile);
  return (
    <Section id="about" eyebrow="About Me" title="A little more context">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="min-w-0">
          <p className="max-w-2xl text-base leading-relaxed text-muted">{profile.bio}</p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <Fact label="Location" value={profile.location} />
            <Fact label="Focus" value={profile.interests} />
            <Fact label="Education" value={profile.educationSummary} />
            <Fact label="Role" value={profile.role} />
          </dl>
        </Reveal>
        <Reveal delay={80} className="min-w-0">
          <div className="glass glow-card rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="size-16 overflow-hidden rounded-2xl bg-bg-subtle outline outline-1 -outline-offset-1 outline-white/10">
                {photo ? (
                  <img src={photo} alt="" className="size-full object-cover object-[center_12%]" />
                ) : (
                  <div className="grid size-full place-items-center font-display font-bold text-accent">
                    {initials(profile.name)}
                  </div>
                )}
              </div>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">{profile.name}</p>
                <p className="text-sm text-muted">{profile.role}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted">
                <User className="mt-0.5 size-4 text-accent" />
                {profile.tagline}
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <Sparkles className="mt-0.5 size-4 text-violet" />
                {profile.interests}
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-0.5 size-4 text-accent" />
                {profile.location}
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-bg-elevated/40 p-4">
      <dt className="text-xs tracking-wide text-subtle uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-fg">{value}</dd>
    </div>
  );
}
