import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Nav */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="font-display text-xl font-semibold">Zoufri</span>
        <Link
          href="/login"
          className="text-sm font-medium text-ink/70 hover:text-ink"
        >
          Log in
        </Link>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-display text-4xl leading-[1.1] md:text-5xl">
            Find a roommate you&apos;ll actually get along with.
          </h1>
          <p className="mt-5 max-w-md text-ink/70">
            Zoufri matches people looking for a place with people who have
            one — not just on budget and city, but on how you actually live:
            cleanliness, noise, sleep schedule, and more.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/login"
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-paper hover:bg-accent/90"
            >
              Get started
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-full border border-sand px-6 py-3 text-sm font-medium hover:bg-sand/40"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Hero visual: a mock compatibility card, echoing the real browse UI */}
        <div className="mx-auto w-full max-w-xs rounded-2xl border border-sand bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-sand" />
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-paper">
              92% match
            </span>
          </div>
          <p className="mt-4 font-display text-lg">Yasmine, 26</p>
          <p className="text-sm text-ink/60">Agadir · 2,500–3,500 MAD</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
            <span className="rounded-full bg-paper px-2.5 py-1 border border-sand">
              Early bird
            </span>
            <span className="rounded-full bg-paper px-2.5 py-1 border border-sand">
              Non-smoker
            </span>
            <span className="rounded-full bg-paper px-2.5 py-1 border border-sand">
              Tidy
            </span>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="border-y border-sand">
        <div className="mx-auto grid max-w-5xl md:grid-cols-2">
          <div className="bg-accent px-6 py-14 text-paper md:px-10">
            <h2 className="font-display text-2xl">Have a place?</h2>
            <p className="mt-3 max-w-sm text-paper/85">
              List it, describe what you&apos;re looking for in a roommate,
              and let compatible people find you.
            </p>
          </div>
          <div className="px-6 py-14 md:px-10">
            <h2 className="font-display text-2xl">Need a place?</h2>
            <p className="mt-3 max-w-sm text-ink/70">
              Set your budget and city, tell us how you live, and browse
              rooms and roommates that actually fit.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="font-display text-3xl">
          Compatibility, not just logistics
        </h2>
        <p className="mt-3 max-w-lg text-ink/70">
          Budget and location get you in the door. These are what actually
          determine whether living together works.
        </p>

        <dl className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
          <div>
            <dt className="font-medium">Cleanliness</dt>
            <dd className="mt-1 text-sm text-ink/60">
              From relaxed to spotless — matched so nobody&apos;s annoyed.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Noise & guests</dt>
            <dd className="mt-1 text-sm text-ink/60">
              How much quiet you need, and how often people have friends
              over.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Sleep schedule</dt>
            <dd className="mt-1 text-sm text-ink/60">
              Early bird, night owl, or flexible — so your hours don&apos;t
              clash.
            </dd>
          </div>
          <div>
            <dt className="font-medium">Habits</dt>
            <dd className="mt-1 text-sm text-ink/60">
              Smoking and drinking preferences, so there are no surprises.
            </dd>
          </div>
        </dl>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl bg-ink px-8 py-14 text-center text-paper md:px-16">
          <h2 className="font-display text-3xl">
            Your next home starts with the right roommate.
          </h2>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink hover:bg-paper/90"
          >
            Get started
          </Link>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pb-10 text-sm text-ink/50">
        Zoufri
      </footer>
    </main>
  );
}