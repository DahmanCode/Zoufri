'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type OnboardingResult = {
  error?: string
}

export async function completeOnboarding(
  _prevState: OnboardingResult,
  formData: FormData
): Promise<OnboardingResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be logged in to complete onboarding.' }
  }

  const userType = formData.get('user_type') as string
  const budgetMin = formData.get('budget_min') as string
  const budgetMax = formData.get('budget_max') as string
  const moveInDate = formData.get('move_in_date') as string
  const preferredCity = formData.get('preferred_city') as string
  const bio = formData.get('bio') as string

  if (userType !== 'has_place' && userType !== 'needs_place') {
    return { error: 'Please select whether you have a place or need one.' }
  }

  // 1. Update the core profile
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      user_type: userType,
      budget_min: budgetMin ? Number(budgetMin) : null,
      budget_max: budgetMax ? Number(budgetMax) : null,
      move_in_date: moveInDate || null,
      preferred_city: preferredCity || null,
      bio: bio || null,
    })
    .eq('id', user.id)

  if (profileError) {
    return { error: `Could not save profile: ${profileError.message}` }
  }

  // 2. Upsert lifestyle preferences
  const cleanliness = formData.get('cleanliness') as string
  const noiseTolerance = formData.get('noise_tolerance') as string
  const sleepSchedule = formData.get('sleep_schedule') as string
  const smoking = formData.get('smoking') === 'on'
  const drinking = formData.get('drinking') as string
  const hasPets = formData.get('has_pets') === 'on'
  const petType = formData.get('pet_type') as string
  const guestsOften = formData.get('guests_often') === 'on'
  const socialLevel = formData.get('social_level') as string
  const workFromHome = formData.get('work_from_home') === 'on'

  const { error: lifestyleError } = await supabase
    .from('lifestyle_preferences')
    .upsert({
      profile_id: user.id,
      cleanliness: cleanliness ? Number(cleanliness) : null,
      noise_tolerance: noiseTolerance ? Number(noiseTolerance) : null,
      sleep_schedule: sleepSchedule || null,
      smoking,
      drinking: drinking || null,
      has_pets: hasPets,
      pet_type: hasPets ? petType || null : null,
      guests_often: guestsOften,
      social_level: socialLevel ? Number(socialLevel) : null,
      work_from_home: workFromHome,
    })

  if (lifestyleError) {
    return { error: `Could not save lifestyle preferences: ${lifestyleError.message}` }
  }

  // 3. If they have a place, create/update their listing
  if (userType === 'has_place') {
    const address = formData.get('address') as string
    const city = formData.get('listing_city') as string
    const neighborhood = formData.get('neighborhood') as string
    const rentAmount = formData.get('rent_amount') as string
    const availableFrom = formData.get('available_from') as string
    const bedrooms = formData.get('bedrooms') as string
    const bathrooms = formData.get('bathrooms') as string
    const description = formData.get('listing_description') as string

    const { error: listingError } = await supabase
      .from('listings')
      .upsert(
        {
          profile_id: user.id,
          address: address || null,
          city: city || null,
          neighborhood: neighborhood || null,
          rent_amount: rentAmount ? Number(rentAmount) : null,
          available_from: availableFrom || null,
          bedrooms: bedrooms ? Number(bedrooms) : null,
          bathrooms: bathrooms ? Number(bathrooms) : null,
          description: description || null,
        },
        { onConflict: 'profile_id' }
      )

    if (listingError) {
      return { error: `Could not save listing: ${listingError.message}` }
    }
  }

  redirect('/dashboard')
}