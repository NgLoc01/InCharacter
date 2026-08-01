import { useState } from 'react'

type Props = {
  loading: boolean
  onSend: (text: string) => void
}

export default function ChatInput({ loading, onSend }: Props) {
  const [input, setInput] = useState('')

  function submit() {
    const text = input.trim()
    if (!text || loading) return
    onSend(text)
    setInput('')
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="Say something..."
        style={{ flex: 1 }}
      />
      <button onClick={submit} disabled={loading}>
        Send
      </button>
    </div>
  )
}
