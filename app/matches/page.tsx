import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MatchesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Every match is stored as two rows (one per direction). Pull all
  // 'matched' rows where I'm on either side, then dedupe by the OTHER
  // person's id so each match only shows up once.
  const { data: matchRows, error } = await supabase
    .from('matches')
    .select('user_id, target_id')
    .eq('status', 'matched')
    .or(`user_id.eq.${user.id},target_id.eq.${user.id}`)

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <p className="text-red-600">Could not load matches: {error.message}</p>
      </div>
    )
  }

  const otherIds = Array.from(
    new Set(
      (matchRows ?? []).map((row) =>
        row.user_id === user.id ? row.target_id : row.user_id
      )
    )
  )

  if (otherIds.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <h1 className="text-2xl font-semibold mb-6">Your matches</h1>
        <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No matches yet — head to{' '}
          <Link href="/browse" className="underline">
            browse
          </Link>{' '}
          to find some.
        </div>
      </div>
    )
  }

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select(
      `
      id,
      full_name,
      avatar_url,
      bio,
      preferred_city,
      user_type,
      listings (address, city, rent_amount)
    `
    )
    .in('id', otherIds)

  if (profilesError) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <p className="text-red-600">Could not load match profiles: {profilesError.message}</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Your matches</h1>

      <div className="space-y-4">
        {(profiles ?? []).map((profile) => {
          const listing = Array.isArray(profile.listings) ? profile.listings[0] : profile.listings

          return (
            <div
              key={profile.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 p-4"
            >
              <div className="h-14 w-14 shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name ?? 'Match'}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm">No photo</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{profile.full_name ?? 'Anonymous'}</p>
                <p className="text-sm text-gray-500 truncate">
                  {profile.user_type === 'has_place' && listing
                    ? listing.address ?? listing.city ?? profile.preferred_city
                    : profile.preferred_city}
                </p>
                {profile.bio && (
                  <p className="text-sm text-gray-400 truncate mt-0.5">{profile.bio}</p>
                )}
              </div>

              <Link
                href={`/matches/${profile.id}`}
                className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Message
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}