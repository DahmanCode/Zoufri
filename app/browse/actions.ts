'use server'

import { createClient } from '@/lib/supabase/server'

export type SwipeResult = {
  matched: boolean
  error?: string
}

export async function recordSwipe(
  targetId: string, 
  action: 'like' | 'pass'
): Promise<SwipeResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { matched: false, error: 'Not logged in.' }
  }

  const status = action === 'like' ? 'pending' : 'rejected'

  const { data, error } = await supabase.rpc('record_swipe', {
    target_id_param: targetId,
    new_status: status,
  })

  if (error) {
    return { matched: false, error: error.message }
  }

  return { matched: Boolean((data as { matched: boolean })?.matched) }
}
