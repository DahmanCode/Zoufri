import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

export default async function SiteNav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="mx-auto flex max-w-[1240px] items-center justify-between px-6 pt-8 pb-4">
      <Link
        href="/"
        className="font-display text-[22px] font-semibold text-[#211F1A] flex items-center gap-2"
      >
        <span className="w-[26px] h-[26px] rounded-[7px] bg-[#1F4E5F] relative block after:content-[''] after:absolute after:inset-[6px] after:rounded-[3px] after:bg-[#C08A3E]" />
        Zoufri
      </Link>

      <nav className="flex items-center gap-8 text-[15px] font-medium text-[#5B5748]">
        <Link href="/browse" className="hover:text-[#211F1A] transition-colors">
          Browse
        </Link>

        {user ? (
          <>
            <Link href="/dashboard" className="hover:text-[#211F1A] transition-colors">
              Dashboard
            </Link>
            <Link href="/matches" className="hover:text-[#211F1A] transition-colors">
              Matches
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/#how-it-works" className="hover:text-[#211F1A] transition-colors">
              How it works
            </Link>
            <Link href="/onboarding" className="hover:text-[#211F1A] transition-colors">
              List your place
            </Link>
            <Link
              href="/login"
              className="bg-[#211F1A] text-[#FFFDF8] px-[22px] py-[11px] rounded-full text-[14.5px] font-semibold inline-block"
            >
              Sign in
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}