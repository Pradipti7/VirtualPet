import Modal from './Modal'

const GAMES = [
  {
    id: 'memory',
    name: 'Memory Match',
    emoji: '🃏',
    description: 'Match pairs of cards',
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    id: 'stack',
    name: 'Block Stack',
    emoji: '🧱',
    description: 'Stack blocks as high as you can',
    color: 'bg-blue-500 hover:bg-blue-600',
  },
]

function GameSelector({ onSelect, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎮 Choose a Game</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {GAMES.map(game => (
          <button
            key={game.id}
            onClick={() => onSelect(game.id)}
            className={`${game.color} text-white p-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md flex flex-col items-center gap-2`}
          >
            <span className="text-4xl">{game.emoji}</span>
            <span className="font-bold">{game.name}</span>
            <span className="text-xs opacity-90">{game.description}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default GameSelector
