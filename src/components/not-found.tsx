import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <p className="font-mono text-sm tracking-[0.25em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
        This path does not compile
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you are looking for is not in this workspace. Head back to the
        portfolio.
      </p>
      <Button asChild variant="glow" className="mt-8">
        <Link to="/">
          <ArrowLeft />
          Back home
        </Link>
      </Button>
    </main>
  );
}
