import { ANIMALS } from '../data/animals'
import StatBar from '../components/StatBar'
import ActionButton from '../components/ActionButton'
import PetAvatar from '../components/PetAvatar'

const ACTIONS = [
  { action: 'feed', label: 'Feed', emoji: '🍖', color: 'bg-orange-500 hover:bg-orange-600' },
  { action: 'play', label: 'Play', emoji: '⚽', color: 'bg-blue-500 hover:bg-blue-600' },
  { action: 'sleep', label: 'Sleep', emoji: '😴', color: 'bg-purple-500 hover:bg-purple-600' },
  { action: 'bath', label: 'Bath', emoji: '🛁', color: 'bg-cyan-500 hover:bg-cyan-600' },
]

const STATS = [
  { key: 'hunger', label: 'Hunger', emoji: '🍖', color: 'bg-red-500' },
  { key: 'happiness', label: 'Happiness', emoji: '😊', color: 'bg-yellow-500' },
  { key: 'energy', label: 'Energy', emoji: '⚡', color: 'bg-green-500' },
  { key: 'cleanliness', label: 'Cleanliness', emoji: '✨', color: 'bg-cyan-500' },
]

function PetCarePage({ pet, onAction }) {
  return (
    <div className="room-bg min-h-screen w-full flex flex-col justify-between overflow-hidden">
      {/* Stats - top right */}
      <div className="absolute top-4 right-4 w-56 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 z-10">
        <h2 className="text-sm font-bold text-gray-700 mb-3 text-center">Pet Status</h2>
        <div className="space-y-3">
          {STATS.map((stat) => (
            <StatBar
              key={stat.key}
              label={`${stat.emoji} ${stat.label}`}
              value={pet[stat.key]}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      {/* Pet name - top left */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-2xl font-bold text-white drop-shadow-lg">{pet.name}</h1>
      </div>

      {/* Pet - center */}
      <div className="flex-1 flex items-end justify-center pb-8">
        <div className="pet-idle">
          <PetAvatar type={pet.type} className="w-64 h-64 drop-shadow-2xl" />
        </div>
      </div>

      {/* Action buttons - bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent pt-12 pb-6 px-4">
        <div className="flex justify-center gap-4 max-w-lg mx-auto">
          {ACTIONS.map((a) => (
            <button
              key={a.action}
              onClick={() => onAction(a.action)}
              className={`${a.color} text-white font-semibold py-4 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg flex flex-col items-center gap-1 min-w-[80px]`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <span className="text-sm">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetCarePage
