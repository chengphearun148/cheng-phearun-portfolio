import { Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CvBanner({ name }: { name: string }) {
  return (
    <section className="px-4 pb-16">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-bg-elevated/70 px-6 py-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
            <Download className="size-5" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              Download My CV
            </p>
            <p className="text-sm text-muted">
              Get {name}'s resume and learn more about the path so far.
            </p>
          </div>
        </div>
        <Button asChild variant="gradient">
          <Link to="/cv">
            Download CV
            <Download />
          </Link>
        </Button>
      </div>
    </section>
  );
}
