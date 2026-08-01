import type { Message } from '../types'
import MessageBubble from './MessageBubble'

type Props = {
  messages: Message[]
  characterName: string
  loading: boolean
}

export default function ChatWindow({ messages, characterName, loading }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
      {messages.map((m, i) => {
        const isStreamingPlaceholder = loading && i === messages.length - 1 && m.role === 'character' && m.text === ''
        return (
          <MessageBubble
            key={i}
            message={m}
            characterName={characterName}
            isStreamingPlaceholder={isStreamingPlaceholder}
          />
        )
      })}
    </div>
  )
}
