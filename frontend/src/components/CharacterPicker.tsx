import type { CharacterInfo } from '../types'

const imagePositions: Record<string, string> = {
  gandalf: 'top',
  'uncle-iroh': 'top',
}

type Props = {
  characters: CharacterInfo[]
  selectedId: string
  disabled: boolean
  onSelect: (id: string) => void
}

export default function CharacterPicker({ characters, selectedId, disabled, onSelect }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem' }}>
      {characters.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          disabled={disabled}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.375rem',
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          <img
            src={c.imageUrl}
            alt={c.name}
            style={{
              width: 56,
              height: 104,
              borderRadius: '28px',
              objectFit: 'cover',
              objectPosition: imagePositions[c.id] ?? 'center',
              border: c.id === selectedId ? '3px solid #333' : '2px solid #ccc',
            }}
          />
          <span style={{ fontSize: '0.8rem', fontWeight: c.id === selectedId ? 600 : 400 }}>
            {c.name}
          </span>
        </button>
      ))}
    </div>
  )
}
