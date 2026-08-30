'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type SendMessageResult = {
  error?: string
}

// Since each match is stored as two rows (one per direction), both
// people need to resolve to the SAME row when sending/reading messages.
// We do that by always looking up the row using a sorted (canonical)
// ordering of the two user ids, so it doesn't matter who swiped first.
async function getCanonicalMatchId(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userA: string,
  userB: string
): Promise<string | null> {
  const [first, second] = [userA, userB].sort()

  const { data, error } = await supabase
    .from('matches')
    .select('id')
    .eq('user_id', first)
    .eq('target_id', second)
    .eq('status', 'matched')
    .maybeSingle()

  if (error || !data) return null
  return data.id
}

export async function sendMessage(
  otherUserId: string,
  _prevState: SendMessageResult,
  formData: FormData
): Promise<SendMessageResult> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'You must be logged in to send messages.' }
  }

  const content = (formData.get('content') as string)?.trim()

  if (!content) {
    return { error: 'Message cannot be empty.' }
  }

  const matchId = await getCanonicalMatchId(supabase, user.id, otherUserId)

  if (!matchId) {
    return { error: 'No match found with this user.' }
  }

  const { error: insertError } = await supabase.from('messages').insert({
    match_id: matchId,
    sender_id: user.id,
    content,
  })

  if (insertError) {
    return { error: insertError.message }
  }

  revalidatePath(`/matches/${otherUserId}`)
  return {}
}
