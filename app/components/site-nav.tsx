import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function SiteNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <Link href="/" className="font-display text-xl font-semibold">
        Zoufri
      </Link>

      <nav className="flex items-center gap-6 text-sm font-medium text-ink/70">
        <Link href="/browse" className="hover:text-ink">
          Browse
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-ink">
              Dashboard
            </Link>
            <Link href="/matches" className="hover:text-ink">
              Matches
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/#how-it-works" className="hover:text-ink">
              How it works
            </Link>
            <Link href="/onboarding" className="hover:text-ink">
              List your place
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper hover:bg-accent/90"
            >
              Sign in
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}