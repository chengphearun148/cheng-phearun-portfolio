import { useState } from "react";
import { toast } from "sonner";
import { submitContact } from "@/lib/portfolio.functions";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteProfile, SocialLink } from "@/lib/portfolio-types";
import { SocialIcon } from "@/components/social-icon";

export function ContactForm({
  profile,
  social,
}: {
  profile: SiteProfile;
  social: SocialLink[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      await submitContact({ data: { name, email, message } });
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent. I will get back to you.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not send message";
      toast.error(msg);
    } finally {
      setPending(false);
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's talk">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="max-w-md text-muted">
            Have a question, a project idea, or just want to say hello? Send a
            message — it is stored on this site and I read every one.
          </p>
          <p className="mt-4 text-sm text-muted">{profile.location}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {social
              .filter((s) => s.url)
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted hover:text-fg"
                >
                  <SocialIcon platform={s.platform} className="size-4" />
                  {s.label}
                </a>
              ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="glass rounded-2xl p-5 sm:p-6">
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to talk about?"
              />
            </div>
            <Button type="submit" variant="gradient" disabled={pending}>
              {pending ? "Sending…" : "Send Message"}
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
}
