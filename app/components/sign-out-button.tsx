"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="rounded-full border border-[#211F1A]/15 px-4 py-2 text-[14.5px] font-medium text-[#5B5748] transition hover:bg-[#211F1A]/5 hover:text-[#211F1A]"
    >
      Sign out
    </button>
  );
}