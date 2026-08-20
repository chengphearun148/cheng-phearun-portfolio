import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getPortfolio } from "@/lib/portfolio.functions";
import { AdminDashboard } from "@/components/admin-dashboard";

export const Route = createFileRoute("/admin")({
  loader: () => getPortfolio(),
  component: AdminPage,
});

function AdminPage() {
  const { user, isPending } = useCurrentUserState();
  const data = Route.useLoaderData();

  if (isPending) {
    return (
      <main className="grid min-h-[100dvh] place-items-center bg-bg text-muted">
        Loading session…
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return <AdminDashboard data={data} user={user} />;
}

export function AdminHomeLink() {
  return (
    <Link to="/" className="text-sm text-muted hover:text-fg">
      View site
    </Link>
  );
}
