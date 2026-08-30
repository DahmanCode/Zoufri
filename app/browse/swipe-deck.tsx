'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export type Candidate = {
  id: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  preferred_city: string | null
  budget_min: number | null
  budget_max: number | null
  move_in_date: string | null
  listing: {
    address: string | null
    city: string | null
    rent_amount: number | null
    bedrooms: number | null
    bathrooms: number | null
    description: string | null
  } | null
  compatibility_score: number
}

export default function SwipeDeck({ candidates }: { candidates: Candidate[] }) {
  const [index, setIndex] = useState(0)
  const [pending, setPending] = useState(false)
  const [matchBanner, setMatchBanner] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const current = candidates[index]

  async function handleSwipe(action: 'like' | 'pass') {
    if (!current || pending) return
    setPending(true)
    setErrorMsg(null)

    const supabase = createClient()
    const status = action === 'like' ? 'pending' : 'rejected'

    const { data, error } = await supabase.rpc('record_swipe', {
      target_id_param: current.id,
      new_status: status,
    })

    setPending(false)

    if (error) {
      setErrorMsg(error.message)
      return
    }

    const matched = Boolean((data as { matched?: boolean })?.matched)

    if (matched) {
      setMatchBanner(true)
      setTimeout(() => setMatchBanner(false), 2500)
    }

    setIndex((i) => i + 1)
  }

  // NOTE: the match banner must render regardless of whether there are
  // more candidates left, since the swipe that triggers a match might
  // also be the last candidate in the deck (exhausting the list).
  const banner = matchBanner && (
    <div className="rounded-lg bg-black text-white text-center py-3 font-medium mb-4">
      🎉 It's a match!
    </div>
  )

  if (!current) {
    return (
      <div>
        {banner}
        <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No more profiles right now — check back later.
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {banner}

      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        <div className="h-56 bg-gray-100 flex items-center justify-center text-gray-400">
          {current.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.avatar_url} alt={current.full_name ?? 'Profile'} className="h-full w-full object-cover" />
          ) : (
            <span>No photo</span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{current.full_name ?? 'Anonymous'}</h2>
            <span className="rounded-full bg-black text-white text-xs px-2.5 py-1">
              {current.compatibility_score}% match
            </span>
          </div>

          {current.bio && <p className="text-gray-600 text-sm">{current.bio}</p>}

          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            {current.preferred_city && <span className="rounded-full bg-gray-100 px-2.5 py-1">{current.preferred_city}</span>}
            {current.budget_min && current.budget_max && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1">
                {current.budget_min}–{current.budget_max} MAD
              </span>
            )}
            {current.move_in_date && (
              <span className="rounded-full bg-gray-100 px-2.5 py-1">Move in {current.move_in_date}</span>
            )}
          </div>

          {current.listing && (
            <div className="rounded-lg bg-gray-50 p-3 text-sm">
              <p className="font-medium">{current.listing.address ?? current.listing.city}</p>
              {current.listing.description && <p className="text-gray-500 mt-1">{current.listing.description}</p>}
              <p className="text-gray-500 mt-1">
                {current.listing.bedrooms ?? '–'} bed · {current.listing.bathrooms ?? '–'} bath ·{' '}
                {current.listing.rent_amount ? `${current.listing.rent_amount} MAD/mo` : ''}
              </p>
            </div>
          )}
        </div>
      </div>

      {errorMsg && (
        <p className="mt-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg p-3">
          {errorMsg}
        </p>
      )}

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => handleSwipe('pass')}
          disabled={pending}
          className="rounded-full border border-gray-300 px-6 py-3 font-medium disabled:opacity-50"
        >
          Pass
        </button>
        <button
          onClick={() => handleSwipe('like')}
          disabled={pending}
          className="rounded-full bg-black text-white px-6 py-3 font-medium disabled:opacity-50"
        >
          Like
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400">
        {index + 1} of {candidates.length}
      </p>
    </div>
  )
}