import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

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
  .from('profiles')
  .select('user_type')
  .eq('id', user.id)
  .single()

  if (!profile?.user_type) {
    redirect('/onboarding')
  }

  // Example database read. Create a `profiles` table (see README) for this to return rows.
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, created_at")
    .limit(10);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <SignOutButton />
      </div>

      <p className="text-sm text-ink/70">
        Signed in as <span className="font-medium text-ink">{user.email}</span>
      </p>

      <div className="rounded-md border border-ink/10 p-4">
        <h2 className="text-sm font-medium">Profiles table</h2>
        {error ? (
          <p className="mt-2 text-sm text-ink/60">
            No <code className="rounded bg-ink/5 px-1 py-0.5">profiles</code> table
            found yet — create one in Supabase to see rows here (see README).
          </p>
        ) : (
          <pre className="mt-2 overflow-x-auto text-xs text-ink/70">
            {JSON.stringify(profiles, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
