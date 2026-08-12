import { ANIMALS } from '../data/animals'
import StatBar from '../components/StatBar'
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
    <div className="room-bg min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Stats - top right */}
      <div className="absolute top-4 right-4 w-52 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 z-20">
        <h2 className="text-xs font-bold text-gray-700 mb-2 text-center">Pet Status</h2>
        <div className="space-y-2">
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
      <div className="absolute top-4 left-4 z-20">
        <h1 className="text-xl font-bold text-gray-800 drop-shadow">{pet.name}</h1>
      </div>

      {/* Pet - center bottom, sitting on floor */}
      <div className="flex-1 flex items-end justify-center pb-24 relative z-10">
        <div className="pet-idle">
          <PetAvatar type={pet.type} className="w-52 h-52 drop-shadow-xl" />
        </div>
      </div>

      {/* Action buttons - very bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-8 px-4 z-20 bg-gradient-to-t from-amber-700/50 to-transparent">
        <div className="flex justify-center gap-3 max-w-md mx-auto">
          {ACTIONS.map((a) => (
            <button
              key={a.action}
              onClick={() => onAction(a.action)}
              className={`${a.color} text-white font-medium py-2 px-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-sm`}
            >
              <span className="text-base">{a.emoji}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PetCarePage
