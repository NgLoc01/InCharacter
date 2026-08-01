import CharacterPicker from './components/CharacterPicker'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import { useChat } from './hooks/useChat'

export default function App() {
  const { characters, character, characterId, messages, loading, selectCharacter, send } = useChat()

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>
        {character ? `Chat with ${character.name}` : 'Chat'}
      </h1>

      <CharacterPicker
        characters={characters}
        selectedId={characterId}
        disabled={loading}
        onSelect={selectCharacter}
      />

      <ChatWindow messages={messages} characterName={character?.name ?? 'Character'} loading={loading} />

      <ChatInput loading={loading} onSend={send} />
    </div>
  )
}
