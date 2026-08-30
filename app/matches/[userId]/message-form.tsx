'use client'

import { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { sendMessage, type SendMessageResult } from './actions'

const initialState: SendMessageResult = {}

function SendButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-black text-white px-5 py-2.5 text-sm font-medium disabled:opacity-50"
    >
      {pending ? 'Sending...' : 'Send'}
    </button>
  )
}

export default function MessageForm({ otherUserId }: { otherUserId: string }) {
  const sendMessageWithUser = sendMessage.bind(null, otherUserId)
  const [state, formAction] = useFormState(sendMessageWithUser, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <div className="border-t border-gray-200 pt-4">
      {state?.error && (
        <p className="mb-2 text-sm text-red-600">{state.error}</p>
      )}
      <form
        ref={formRef}
        action={async (formData) => {
          await formAction(formData)
          formRef.current?.reset()
        }}
        className="flex gap-2"
      >
        <input
          name="content"
          type="text"
          placeholder="Type a message..."
          autoComplete="off"
          required
          className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm"
        />
        <SendButton />
      </form>
    </div>
  )
}
