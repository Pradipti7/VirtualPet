const ACTIONS = [
  { action: 'feed', label: 'Feed', emoji: '🍖', color: 'bg-orange-500 hover:bg-orange-600' },
  { action: 'play', label: 'Play', emoji: '⚽', color: 'bg-blue-500 hover:bg-blue-600' },
  { action: 'sleep', label: 'Sleep', emoji: '😴', color: 'bg-purple-500 hover:bg-purple-600' },
  { action: 'bath', label: 'Bath', emoji: '🛁', color: 'bg-cyan-500 hover:bg-cyan-600' },
]

export default function ActionButtons({ onPlay, onFeed, onAction }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pb-4 pt-8 px-4 z-20 bg-gradient-to-t from-amber-700/50 to-transparent">
      <div className="flex justify-center gap-3 max-w-md mx-auto">
        {ACTIONS.map((a) => (
          <button
            key={a.action}
            onClick={() => a.action === 'play' ? onPlay() : a.action === 'feed' ? onFeed() : onAction(a.action)}
            className={`${a.color} text-white font-medium py-2 px-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 text-sm`}
          >
            <span className="text-base">{a.emoji}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
