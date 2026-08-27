import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { computeCompatibility, type LifestylePrefs } from './compatibility'
import SwipeDeck, { type Candidate } from './swipe-deck'

export default async function BrowsePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get my own profile + lifestyle prefs (needed to know who to show, and to score)
  const { data: myProfile } = await supabase
    .from('profiles')
    .select('user_type, preferred_city, budget_min, budget_max')
    .eq('id', user.id)
    .single()

  if (!myProfile?.user_type) {
    redirect('/onboarding')
  }

  const { data: myPrefs } = await supabase
    .from('lifestyle_preferences')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  // Opposite type: has_place users see needs_place users, and vice versa
  const targetType = myProfile.user_type === 'has_place' ? 'needs_place' : 'has_place'

  // Get ids I've already swiped on so we don't show them again
  const { data: alreadySwiped } = await supabase
    .from('matches')
    .select('target_id')
    .eq('user_id', user.id)

  const excludeIds = (alreadySwiped ?? []).map((m) => m.target_id)
  excludeIds.push(user.id) // never show yourself

  let query = supabase
    .from('profiles')
    .select(
      `
      id,
      full_name,
      avatar_url,
      bio,
      preferred_city,
      budget_min,
      budget_max,
      move_in_date,
      lifestyle_preferences (*),
      listings (*)
    `
    )
    .eq('user_type', targetType)
    .not('id', 'in', `(${excludeIds.join(',') || 'null'})`)

  if (myProfile.preferred_city) {
    query = query.eq('preferred_city', myProfile.preferred_city)
  }

  const { data: candidates, error } = await query.limit(30)

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-6 py-12">
        <p className="text-red-600">Could not load candidates: {error.message}</p>
      </div>
    )
  }

  // Score and sort candidates by compatibility
  const scored: Candidate[] = (candidates ?? [])
    .filter((c) => c.lifestyle_preferences) // only show fully onboarded users
    .map((c) => {
      const theirPrefs = Array.isArray(c.lifestyle_preferences)
        ? c.lifestyle_preferences[0]
        : c.lifestyle_preferences
      const score = myPrefs
        ? computeCompatibility(myPrefs as LifestylePrefs, theirPrefs as LifestylePrefs)
        : 50

      return {
        id: c.id,
        full_name: c.full_name,
        avatar_url: c.avatar_url,
        bio: c.bio,
        preferred_city: c.preferred_city,
        budget_min: c.budget_min,
        budget_max: c.budget_max,
        move_in_date: c.move_in_date,
        listing: Array.isArray(c.listings) ? c.listings[0] : c.listings,
        compatibility_score: score,
      }
    })
    .sort((a, b) => b.compatibility_score - a.compatibility_score)

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        {targetType === 'has_place' ? 'Places for you' : 'Roommates for you'}
      </h1>
      <SwipeDeck candidates={scored} />
    </div>
  )
}
