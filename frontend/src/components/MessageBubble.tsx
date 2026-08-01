import type { Message } from '../types'

type Props = {
  message: Message
  characterName: string
  isStreamingPlaceholder: boolean
}

export default function MessageBubble({ message, characterName, isStreamingPlaceholder }: Props) {
  return (
    <div style={{ textAlign: message.role === 'user' ? 'right' : 'left' }}>
      <strong>{message.role === 'user' ? 'You' : characterName}:</strong>{' '}
      {isStreamingPlaceholder ? `${characterName} is thinking...` : message.text}
    </div>
  )
}
