'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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

  // Record this user's swipe on the target
  const { error: insertError } = await supabase
    .from('matches')
    .upsert(
      {
        user_id: user.id,
        target_id: targetId,
        status,
      },
      { onConflict: 'user_id,target_id' }
    )

  if (insertError) {
    return { matched: false, error: insertError.message }
  }

  if (action === 'pass') {
    revalidatePath('/browse')
    return { matched: false }
  }

  // Check if the target already liked this user back
  const { data: reciprocal, error: reciprocalError } = await supabase
    .from('matches')
    .select('id, status')
    .eq('user_id', targetId)
    .eq('target_id', user.id)
    .eq('status', 'pending')
    .maybeSingle()

  if (reciprocalError) {
    return { matched: false, error: reciprocalError.message }
  }

  if (reciprocal) {
    // Mutual like — flip both rows to 'matched'
    await supabase
      .from('matches')
      .update({ status: 'matched' })
      .eq('user_id', user.id)
      .eq('target_id', targetId)

    await supabase
      .from('matches')
      .update({ status: 'matched' })
      .eq('user_id', targetId)
      .eq('target_id', user.id)

    revalidatePath('/browse')
    return { matched: true }
  }

  revalidatePath('/browse')
  return { matched: false }
}
