import StatBar from "./StatBar"

const STATS = [
  { key: 'hunger', label: 'Hunger', emoji: '🍖', color: 'bg-red-500' },
  { key: 'happiness', label: 'Happiness', emoji: '😊', color: 'bg-yellow-500' },
  { key: 'energy', label: 'Energy', emoji: '⚡', color: 'bg-green-500' },
  { key: 'cleanliness', label: 'Cleanliness', emoji: '✨', color: 'bg-cyan-500' },
]

export default function PetStatsPanel({ pet }) {
  return (
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
  )
}
