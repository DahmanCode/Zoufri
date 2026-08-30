import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import MessageForm from './message-form'

export default async function ConversationPage({
  params,
}: {
  params: { userId: string }
}) {
  const supabase = await createClient()
  const otherUserId = params.userId

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (otherUserId === user.id) {
    notFound()
  }

  // Resolve the canonical match row (sorted ordering, see actions.ts for why)
  const [first, second] = [user.id, otherUserId].sort()

  const { data: matchRow } = await supabase
    .from('matches')
    .select('id')
    .eq('user_id', first)
    .eq('target_id', second)
    .eq('status', 'matched')
    .maybeSingle()

  if (!matchRow) {
    // Not actually matched with this person — don't leak the conversation UI
    notFound()
  }

  const { data: otherProfile } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .eq('id', otherUserId)
    .single()

  const { data: messages } = await supabase
    .from('messages')
    .select('id, sender_id, content, created_at')
    .eq('match_id', matchRow.id)
    .order('created_at', { ascending: true })

  return (
    <div className="mx-auto flex h-screen max-w-xl flex-col px-6 py-8">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <Link href="/matches" className="text-sm text-gray-500 hover:text-black">
          ← Back
        </Link>
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
          {otherProfile?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={otherProfile.avatar_url}
              alt={otherProfile.full_name ?? 'Match'}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs">👤</span>
          )}
        </div>
        <h1 className="font-medium">{otherProfile?.full_name ?? 'Anonymous'}</h1>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {(messages ?? []).length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-8">
            No messages yet — say hello!
          </p>
        )}

        {(messages ?? []).map((message) => {
          const isMine = message.sender_id === user.id
          return (
            <div
              key={message.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  isMine
                    ? 'bg-black text-white rounded-br-sm'
                    : 'bg-gray-100 text-black rounded-bl-sm'
                }`}
              >
                {message.content}
              </div>
            </div>
          )
        })}
      </div>

      <MessageForm otherUserId={otherUserId} />
    </div>
  )
}
