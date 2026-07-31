import { useEffect, useState } from 'react'
import CharacterPicker from './components/CharacterPicker'
import type { CharacterInfo } from './types'

export default function App() {
  const [characters, setCharacters] = useState<CharacterInfo[]>([])
  const [characterId, setCharacterId] = useState('')

  useEffect(() => {
    fetch('/api/characters')
      .then((res) => res.json())
      .then((data: CharacterInfo[]) => {
        setCharacters(data)
        if (data.length > 0) setCharacterId(data[0].id)
      })
      .catch(() => {})
  }, [])

  const character = characters.find((c) => c.id === characterId)

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>{character ? `Chat with ${character.name}` : 'Chat'}</h1>

      <CharacterPicker
        characters={characters}
        selectedId={characterId}
        disabled={false}
        onSelect={setCharacterId}
      />
    </div>
  )
}
