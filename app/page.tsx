"use client";

import { useState } from "react";
import Link from "next/link";

const ONBOARDING_ROUTE = "/onboarding";
const BROWSE_ROUTE = "/browse";
const LOGIN_ROUTE = "/login";

export default function LandingBento() {
  const [mode, setMode] = useState<"need" | "have">("need");

  const onboardingHref = `${ONBOARDING_ROUTE}?type=${mode}`;

  return (
    <div className="bg-[#E2DAC5] text-[#211F1A]">
      <div className="max-w-[1240px] mx-auto px-6 pt-12 pb-24">
        {/* NAV */}
        <nav className="flex items-center justify-between mb-9">
                    <Link href="/" className="font-display text-[22px] font-semibold flex items-center gap-2">
            <span className="w-[26px] h-[26px] rounded-[7px] bg-[#1F4E5F] relative block after:content-[''] after:absolute after:inset-[6px] after:rounded-[3px] after:bg-[#C08A3E]" />
            Zoufri
          </Link>
          <div className="hidden min-[720px]:flex gap-8 text-[15px] text-[#5B5748]">
            <Link href={BROWSE_ROUTE} className="hover:text-[#211F1A] transition-colors">Browse</Link>
            <a href="#how-it-works" className="hover:text-[#211F1A] transition-colors">How it works</a>
            <Link href={ONBOARDING_ROUTE} className="hover:text-[#211F1A] transition-colors">List your place</Link>
          </div>
          <Link href={LOGIN_ROUTE} className="bg-[#211F1A] text-[#FFFDF8] px-[22px] py-[11px] rounded-full font-sans text-[14.5px] font-semibold inline-block">
            Sign in
          </Link>
        </nav>

        {/* HERO GRID */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-[1.55fr_1fr] gap-5">
          {/* HERO CARD */}
          <div className="bg-[#FFFDF8] border border-black/[0.12] rounded-[28px] pt-11 px-10 pb-9 flex flex-col justify-between min-h-[520px]">
            <div>
              <div className="inline-flex items-center gap-2 text-[13.5px] text-[#5B5748] mb-[22px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[#C08A3E]" />
                Roommate matching, made for Morocco
              </div>
              <h1 className="font-display font-medium text-[46px] leading-[1.12] max-w-[520px] tracking-[-0.01em]">
                Find the roommate
                <br />
                who actually <span className="text-[#1F4E5F]">fits your life.</span>
              </h1>
              <p className="mt-[18px] text-[16.5px] text-[#5B5748] max-w-[420px] leading-[1.55]">
                Tell us how you live, we&apos;ll tell you who to live with.
                Compatibility scored on cleanliness, sleep schedule, noise,
                and budget — not just a photo.
              </p>

              <div className="inline-flex mt-7 bg-[#ECE6D6] p-[5px] rounded-full w-fit">
                <button
                  onClick={() => setMode("need")}
                  className={`font-sans text-[14.5px] font-semibold px-5 py-[11px] rounded-full border-none cursor-pointer transition-colors duration-200 ${
                    mode === "need"
                      ? "bg-[#211F1A] text-[#FFFDF8]"
                      : "bg-transparent text-[#5B5748]"
                  }`}
                >
                  I need a place
                </button>
                <button
                  onClick={() => setMode("have")}
                  className={`font-sans text-[14.5px] font-semibold px-5 py-[11px] rounded-full border-none cursor-pointer transition-colors duration-200 ${
                    mode === "have"
                      ? "bg-[#211F1A] text-[#FFFDF8]"
                      : "bg-transparent text-[#5B5748]"
                  }`}
                >
                  I have a place
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 flex-wrap gap-5">
              <Link href={onboardingHref} className="inline-flex items-center gap-[10px] bg-[#211F1A] text-[#FFFDF8] px-6 py-[14px] rounded-full font-sans text-[15px] font-semibold">
                Get matched
                <span className="w-[26px] h-[26px] rounded-full bg-[#FFFDF8] text-[#211F1A] flex items-center justify-center text-[14px]">
                  →
                </span>
              </Link>
              <div className="flex items-center gap-[14px] text-[13.5px] text-[#5B5748]">
                <div className="flex">
                  <span className="w-8 h-8 rounded-full border-2 border-[#FFFDF8] bg-gradient-to-br from-[#C08A3E] to-[#B5573C]" />
                  <span className="w-8 h-8 rounded-full border-2 border-[#FFFDF8] bg-gradient-to-br from-[#1F4E5F] to-[#3A7186] -ml-[10px]" />
                  <span className="w-8 h-8 rounded-full border-2 border-[#FFFDF8] bg-gradient-to-br from-[#7C6A50] to-[#B5573C] -ml-[10px]" />
                </div>
                <span>
                  Trusted by 1,200+ people across Marrakesh, Casablanca &amp;
                  Rabat
                </span>
              </div>
            </div>
          </div>

          {/* MATCH CARD */}
          <div className="rounded-[28px] border border-black/[0.12] p-[22px] text-[#FFFDF8] relative overflow-hidden flex flex-col justify-between bg-[linear-gradient(165deg,#1F4E5F_0%,#163A47_100%)] after:content-[''] after:absolute after:w-[220px] after:h-[220px] after:right-[-70px] after:top-[-70px] after:rounded-full after:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_14px)]">
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[13px] text-white/70">
                {mode === "need" ? "Suggested match" : "Suggested roommate"}
              </span>
              <span className="bg-[#FFFDF8] text-[#163A47] font-bold text-[13px] px-3 py-[7px] rounded-full">
                92% match
              </span>
            </div>
            <div className="mt-[18px] h-[170px] rounded-2xl relative z-10 bg-[linear-gradient(160deg,#3A7186,#1F4E5F_60%,#C08A3E)]" />
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-[19px] font-medium">
                Amine, 27
              </h3>
              <p className="text-[13.5px] text-white/75 mt-1">
                Product designer · Gueliz, Marrakesh
              </p>
              <div className="flex gap-[6px] mt-3 flex-wrap">
                {["Non-smoker", "Early riser", "Quiet home"].map((b) => (
                  <span
                    key={b}
                    className="text-[12px] bg-white/[0.12] px-[10px] py-[5px] rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between items-baseline border-t border-white/[0.15] pt-[14px] relative z-10">
              <div>
                <span className="text-[20px] font-semibold">3,200</span>{" "}
                <span className="text-[12.5px] text-white/70">MAD / mo</span>
              </div>
              <Link href={BROWSE_ROUTE} className="text-[13px] underline">
                View profile
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 min-[860px]:grid-cols-[1fr_1fr_1.1fr] gap-5 mt-5">
          {/* STAT CARD */}
          <div className="bg-[#C08A3E] text-[#211F1A] rounded-[28px] px-[26px] py-[30px] flex flex-col justify-between min-h-[200px]">
            <div className="font-display text-[46px] font-medium">1,200+</div>
            <p className="text-[14.5px] max-w-[220px] leading-[1.5] text-[#211F1A]/75">
              Roommate matches made across Marrakesh, Casablanca and Rabat
              since launch.
            </p>
          </div>

          {/* STEPS CARD */}
                    <div id="how-it-works" className="bg-[#FFFDF8] border border-black/[0.12] rounded-[28px] px-[26px] py-7 min-h-[200px] scroll-mt-8">
            <h3 className="font-display text-[18px] mb-4">How it works</h3>
            {[
              {
                n: "01",
                b: "Build your profile",
                t: "habits, budget, and the neighborhood you're eyeing.",
              },
              {
                n: "02",
                b: "Get scored matches",
                t: "ranked by real compatibility, not just proximity.",
              },
              {
                n: "03",
                b: "Chat and move in",
                t: "message straight from the match, no middleman.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`flex gap-3 py-[10px] ${
                  i !== 0 ? "border-t border-black/[0.12]" : "border-t-0 pt-0"
                }`}
              >
                <span className="font-display text-[14px] text-[#1F4E5F] min-w-[20px]">
                  {s.n}
                </span>
                <span className="text-[14px] text-[#5B5748] leading-[1.4]">
                  <b className="text-[#211F1A] font-semibold">{s.b}</b> — {s.t}
                </span>
              </div>
            ))}
          </div>

          {/* QUOTE CARD */}
          <div className="bg-[#211F1A] text-[#FFFDF8] rounded-[28px] px-[26px] py-7 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="font-display text-[38px] text-[#C08A3E] leading-none">
                &ldquo;
              </div>
              <p className="font-display italic font-normal text-[15.5px] leading-[1.5] mt-2">
                I&apos;d already moved twice with roommates who didn&apos;t
                fit. Zoufri actually asked about my sleep schedule before
                matching me.
              </p>
            </div>
            <div className="flex items-center gap-[10px] mt-[18px]">
              <span className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#C08A3E] to-[#B5573C]" />
              <span className="text-[13px] text-white/70">
                Yasmine
                <b className="block text-[#FFFDF8] text-[14px] font-semibold">
                  Casablanca
                </b>
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-5 rounded-[28px] bg-[#163A47] text-[#FFFDF8] px-12 py-14 relative overflow-hidden flex justify-between items-center gap-[30px] flex-wrap before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_85%_20%,rgba(192,138,62,0.35),transparent_40%),radial-gradient(circle_at_95%_80%,rgba(181,87,60,0.28),transparent_45%)]">
          <div className="relative z-10 max-w-[480px]">
            <h2 className="font-display text-[34px] leading-[1.2] font-medium">
              Your next roommate is already looking too.
            </h2>
            <p className="mt-3 text-white/75 text-[15.5px]">
              Free to browse. Takes about five minutes to set up your profile
              and start seeing matches.
            </p>
          </div>
          <div className="relative z-10 flex items-center gap-[14px]">
            <Link href={onboardingHref} className="bg-[#FFFDF8] text-[#211F1A] px-[26px] py-[15px] rounded-full font-sans font-semibold text-[15px] inline-block">
              Create your profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}