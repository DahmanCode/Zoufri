'use client'

import { Suspense, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { completeOnboarding, type OnboardingResult } from './actions'

const initialState: OnboardingResult = {}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-black px-5 py-2.5 text-white font-medium disabled:opacity-50"
    >
      {pending ? 'Saving...' : label}
    </button>
  )
}

function OnboardingForm() {
  const [state, formAction] = useFormState(completeOnboarding, initialState)
  const searchParams = useSearchParams()

  const typeParam = searchParams.get('type')
  const initialUserType: 'has_place' | 'needs_place' | '' =
    typeParam === 'need' ? 'needs_place' : typeParam === 'have' ? 'has_place' : ''

  const [step, setStep] = useState(initialUserType ? 2 : 1)
  const [userType, setUserType] = useState<'has_place' | 'needs_place' | ''>(initialUserType)

  const totalSteps = userType === 'has_place' ? 4 : 3

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <div className="mb-8">
        <p className="text-sm text-gray-500">
          Step {step} of {totalSteps}
        </p>
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-black transition-all"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form action={formAction} className="space-y-8">
        {/* Hidden field carries user_type on final submit regardless of step */}
        <input type="hidden" name="user_type" value={userType} />

        {/* STEP 1: user type */}
        {step === 1 && (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Are you looking for a place, or do you have one?</h1>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setUserType('needs_place')}
                className={`rounded-xl border p-4 text-left transition ${
                  userType === 'needs_place' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
              >
                <p className="font-medium">I need a place</p>
                <p className="text-sm text-gray-500">Looking to move in with a roommate</p>
              </button>
              <button
                type="button"
                onClick={() => setUserType('has_place')}
                className={`rounded-xl border p-4 text-left transition ${
                  userType === 'has_place' ? 'border-black bg-gray-50' : 'border-gray-200'
                }`}
              >
                <p className="font-medium">I have a place</p>
                <p className="text-sm text-gray-500">Looking for a roommate to fill it</p>
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!userType}
                onClick={() => setStep(2)}
                className="rounded-lg bg-black px-5 py-2.5 text-white font-medium disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: basic profile info */}
        <div className={step === 2 ? 'space-y-4' : 'hidden'}>
          <h1 className="text-2xl font-semibold">Tell us the basics</h1>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred city</label>
            <input
              name="preferred_city"
              type="text"
              placeholder="Agadir"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Budget min (MAD)</label>
              <input
                name="budget_min"
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Budget max (MAD)</label>
              <input
                name="budget_max"
                type="number"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Move-in date</label>
            <input
              name="move_in_date"
              type="date"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short bio</label>
            <textarea
              name="bio"
              rows={3}
              placeholder="A little about you..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(1)} className="px-5 py-2.5 font-medium text-gray-600">
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-lg bg-black px-5 py-2.5 text-white font-medium"
            >
              Continue
            </button>
          </div>
        </div>

        {/* STEP 3: lifestyle preferences */}
        <div className={step === 3 ? 'space-y-4' : 'hidden'}>
          <h1 className="text-2xl font-semibold">Your lifestyle</h1>

          <div>
            <label className="block text-sm font-medium mb-1">Cleanliness (1 = relaxed, 5 = spotless)</label>
            <input name="cleanliness" type="range" min="1" max="5" defaultValue="3" className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Noise tolerance (1 = need quiet, 5 = don't mind noise)</label>
            <input name="noise_tolerance" type="range" min="1" max="5" defaultValue="3" className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Social level (1 = introvert, 5 = extrovert)</label>
            <input name="social_level" type="range" min="1" max="5" defaultValue="3" className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sleep schedule</label>
            <select name="sleep_schedule" className="w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="flexible">Flexible</option>
              <option value="early_bird">Early bird</option>
              <option value="night_owl">Night owl</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Drinking</label>
            <select name="drinking" className="w-full rounded-lg border border-gray-300 px-3 py-2">
              <option value="never">Never</option>
              <option value="socially">Socially</option>
              <option value="often">Often</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="smoking" /> Smokes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="has_pets" /> Has pets
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="guests_often" /> Has guests often
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="work_from_home" /> Works from home
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pet type (if any)</label>
            <input
              name="pet_type"
              type="text"
              placeholder="Cat, dog, etc."
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="px-5 py-2.5 font-medium text-gray-600">
              Back
            </button>
            {userType === 'has_place' ? (
              <button
                type="button"
                onClick={() => setStep(4)}
                className="rounded-lg bg-black px-5 py-2.5 text-white font-medium"
              >
                Continue
              </button>
            ) : (
              <SubmitButton label="Finish" />
            )}
          </div>
        </div>

        {/* STEP 4: listing details, only for has_place */}
        {userType === 'has_place' && (
          <div className={step === 4 ? 'space-y-4' : 'hidden'}>
            <h1 className="text-2xl font-semibold">Your place</h1>

            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                type="text"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  name="listing_city"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Neighborhood</label>
                <input
                  name="neighborhood"
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rent (MAD/month)</label>
                <input
                  name="rent_amount"
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Available from</label>
                <input
                  name="available_from"
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <input
                  name="bedrooms"
                  type="number"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <input
                  name="bathrooms"
                  type="number"
                  step="0.5"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="listing_description"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(3)} className="px-5 py-2.5 font-medium text-gray-600">
                Back
              </button>
              <SubmitButton label="Finish" />
            </div>
          </div>
        )}

        {state?.error && (
          <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded-lg p-3">
            {state.error}
          </p>
        )}
      </form>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl px-6 py-12">Loading…</div>}>
      <OnboardingForm />
    </Suspense>
  )
}