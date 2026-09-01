import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // This sends anyone with an incomplete profile straight to onboarding instead of the dashboard.
  const { data: profile } = await supabase
    .from("profiles")
    .select("user_type, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.user_type) {
    redirect("/onboarding");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-16">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <p className="text-sm text-ink/70">
        Signed in as <span className="font-medium text-ink">{user.email}</span>
      </p>

      <nav className="flex gap-4 text-sm font-medium">
        <Link
          href="/browse"
          className="rounded-full border border-ink/10 px-4 py-2 hover:bg-ink/5"
        >
          Browse
        </Link>
        <Link
          href="/matches"
          className="rounded-full border border-ink/10 px-4 py-2 hover:bg-ink/5"
        >
          Matches
        </Link>
      </nav>

      <div className="rounded-md border border-ink/10 p-4">
        <h2 className="text-sm font-medium">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
        </h2>
        <p className="mt-2 text-sm text-ink/60">
          {profile?.user_type === "has_place"
            ? "Browse people looking for a place, or check your matches."
            : "Browse available places, or check your matches."}
        </p>
      </div>
    </main>
  );
}