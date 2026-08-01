import { useEffect, useState } from 'react'
import type { CharacterInfo, Message } from '../types'

export function useChat() {
  const [characters, setCharacters] = useState<CharacterInfo[]>([])
  const [characterId, setCharacterId] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/characters')
      .then((res) => res.json())
      .then((data: CharacterInfo[]) => {
        setCharacters(data)
        if (data.length > 0) setCharacterId(data[0].id)
      })
      .catch(() => {})
  }, [])

  function selectCharacter(id: string) {
    setCharacterId(id)
    setMessages([])
  }

  async function send(text: string) {
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setLoading(true)

    // Placeholder message that gets filled in as chunks arrive.
    setMessages((prev) => [...prev, { role: 'character', text: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, characterId }),
      })
      if (!res.body) throw new Error('no response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          next[next.length - 1] = { ...last, text: last.text + chunk }
          return next
        })
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = { role: 'character', text: '(no response right now)' }
        return next
      })
    } finally {
      setLoading(false)
    }
  }

  const character = characters.find((c) => c.id === characterId)

  return { characters, character, characterId, messages, loading, selectCharacter, send }
}
