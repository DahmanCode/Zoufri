// Compatibility scoring between two lifestyle_preferences rows.
// Returns a 0-100 score. Pure function, no DB calls, so it can be
// used both server-side (browse page) and re-used later if needed.

export type LifestylePrefs = {
  cleanliness: number | null
  noise_tolerance: number | null
  sleep_schedule: string | null
  smoking: boolean | null
  drinking: string | null
  has_pets: boolean | null
  guests_often: boolean | null
  social_level: number | null
  work_from_home: boolean | null
}

// Each factor's weight sums to 100. Adjust weights any time you want
// to tune what matters most for your users.
const WEIGHTS = {
  cleanliness: 20,
  noise_tolerance: 15,
  sleep_schedule: 15,
  social_level: 15,
  smoking: 15,
  drinking: 10,
  guests_often: 10,
}

function scoreNumeric(a: number | null, b: number | null, weight: number): number {
  if (a == null || b == null) return weight * 0.5 // unknown = neutral, half credit
  const diff = Math.abs(a - b) // 0-4 range since fields are 1-5
  const similarity = 1 - diff / 4
  return similarity * weight
}

function scoreExact(a: string | boolean | null, b: string | boolean | null, weight: number): number {
  if (a == null || b == null) return weight * 0.5
  return a === b ? weight : weight * 0.3
}

export function computeCompatibility(a: LifestylePrefs, b: LifestylePrefs): number {
  let total = 0
  total += scoreNumeric(a.cleanliness, b.cleanliness, WEIGHTS.cleanliness)
  total += scoreNumeric(a.noise_tolerance, b.noise_tolerance, WEIGHTS.noise_tolerance)
  total += scoreNumeric(a.social_level, b.social_level, WEIGHTS.social_level)
  total += scoreExact(a.sleep_schedule, b.sleep_schedule, WEIGHTS.sleep_schedule)
  total += scoreExact(a.smoking, b.smoking, WEIGHTS.smoking)
  total += scoreExact(a.drinking, b.drinking, WEIGHTS.drinking)
  total += scoreExact(a.guests_often, b.guests_often, WEIGHTS.guests_often)
  return Math.round(total)
}
