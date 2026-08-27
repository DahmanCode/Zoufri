import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-start justify-center gap-6 px-6">
      <h1 className="text-3xl font-semibold tracking-tight">
        Next.js + Tailwind + Supabase
      </h1>
      <p className="text-ink/70">
        This starter is wired up with Supabase auth and a Postgres database
        via <code className="rounded bg-ink/5 px-1.5 py-0.5">@supabase/ssr</code>.
      </p>

      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-sm text-ink/70">
            Signed in as <span className="font-medium text-ink">{user.email}</span>
          </p>
          <Link
            href="/dashboard"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
          >
            Go to dashboard
          </Link>
        </div>
      ) : (
        <Link
          href="/login"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90"
        >
          Sign in
        </Link>
      )}
    </main>
  );
}
