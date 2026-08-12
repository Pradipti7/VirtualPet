import { ANIMALS } from '../data/animals'
import StatBar from '../components/StatBar'
import ActionButton from '../components/ActionButton'

const ACTIONS = [
  { action: 'feed', label: 'Feed', color: 'bg-orange-500 hover:bg-orange-600' },
  { action: 'play', label: 'Play', color: 'bg-blue-500 hover:bg-blue-600' },
  { action: 'sleep', label: 'Sleep', color: 'bg-purple-500 hover:bg-purple-600' },
]

const STATS = [
  { key: 'hunger', label: 'Hunger', color: 'bg-red-500' },
  { key: 'happiness', label: 'Happiness', color: 'bg-yellow-500' },
  { key: 'energy', label: 'Energy', color: 'bg-green-500' },
]

function PetCarePage({ pet, onAction }) {
  const animalEmoji = ANIMALS.find((a) => a.type === pet.type)?.emoji || '🐾'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center text-6xl mb-4">{animalEmoji}</div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{pet.name}</h1>

        <div className="space-y-4 mb-8">
          {STATS.map((stat) => (
            <StatBar
              key={stat.key}
              label={stat.label}
              value={pet[stat.key]}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {ACTIONS.map((a) => (
            <ActionButton
              key={a.action}
              onClick={() => onAction(a.action)}
              label={a.label}
              color={a.color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetCarePage
