import { useState, useEffect } from 'react'
import StatBar from '../components/StatBar'
import PetAvatar from '../components/PetAvatar'
import PixelBall from '../components/PixelBall'

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

const ALL_CORNERS = [
  { x: '0px', y: '60px' },
  { x: 'calc(100vw - 160px)', y: '60px' },
  { x: '0px', y: 'calc(100vh - 240px)' },
  { x: 'calc(100vw - 160px)', y: 'calc(100vh - 240px)' },
]

const FLOOR_CORNERS = [
  { x: '0px', y: 'calc(100vh - 240px)' },
  { x: 'calc(100vw - 160px)', y: 'calc(100vh - 240px)' },
]

function PetCarePage({ pet, onAction }) {
  const [corner, setCorner] = useState(1)
  const [sitting, setSitting] = useState(false)
  const [movingRight, setMovingRight] = useState(false)
  const [showBall, setShowBall] = useState(false)
  const [ballKey, setBallKey] = useState(0)
  const [ballPos, setBallPos] = useState({ x: 'calc(50vw - 24px)' })
  const [ballPhase, setBallPhase] = useState('idle') // idle | bounce | roll | rest
  const [rollDir, setRollDir] = useState('left')
  const [bounceDir, setBounceDir] = useState('left')
  const [driftX, setDriftX] = useState(0)
  const [rollX, setRollX] = useState(0)
  const [rolling, setRolling] = useState(false)
  const isFlying = pet.type === 'bird'
  const corners = isFlying ? ALL_CORNERS : FLOOR_CORNERS
  const n = corners.length

  const DROP_POSITIONS = [
    { x: 'calc(15vw - 24px)', vw: 15 },
    { x: 'calc(50vw - 24px)', vw: 50 },
    { x: 'calc(85vw - 24px)', vw: 85 },
  ]

  const handlePlay = () => {
    onAction('play')
    const dropIdx = Math.floor(Math.random() * DROP_POSITIONS.length)
    const pos = DROP_POSITIONS[dropIdx]
    const drift = Math.floor(Math.random() * 80) - 40
    const dir = pos.vw < 50 ? 'right' : 'left'
    const targetX = dir === 'left'
      ? -(pos.vw / 100) * window.innerWidth + 24
      : (100 - pos.vw) / 100 * window.innerWidth - 184
    setBallPos({ x: pos.x })
    setDriftX(drift)
    setRollX(targetX)
    setBallKey((k) => k + 1)
    setBallPhase('bounce')
    setShowBall(true)
    setRollDir(dir)
    setBounceDir(Math.random() < 0.5 ? 'left' : 'right')
    setRolling(false)
    setTimeout(() => {
      setBallPhase('roll')
      setRolling(true)
    }, 2800)
    setTimeout(() => setBallPhase('rest'), 7800)
    setTimeout(() => {
      setShowBall(false)
      setBallPhase('idle')
      setRolling(false)
    }, 30000)
  }

  useEffect(() => {
    setCorner(1)
    setSitting(false)
    setMovingRight(false)
    let moves = 0
    const id = setInterval(() => {
      moves++
      if (moves % 3 === 0) {
        setSitting(true)
        setTimeout(() => setSitting(false), 4000)
      } else {
        setCorner((c) => {
          const next = (c + 1) % n
          const diff = (next - c + n) % n
          setMovingRight(n === 2 ? c === 0 : diff === 1)
          return next
        })
      }
    }, 4000)
    return () => clearInterval(id)
  }, [n])

  const pos = sitting
    ? { x: 'calc(50vw - 80px)', y: isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)' }
    : corners[corner]
  const flipRight = !sitting && movingRight

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
        <h1 className="text-xl font-bold text-gray-800 drop-shadow">{pet.name.charAt(0).toUpperCase() + pet.name.slice(1)}</h1>
      </div>

      {/* Pet - corner to corner movement */}
      <div
        className="pet-corner-walk z-10"
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: flipRight ? 'scaleX(-1)' : 'none',
        }}
      >
        <div className={sitting ? '' : 'pet-bob'}>
          <PetAvatar type={pet.type} className="w-40 h-40 drop-shadow-lg" />
        </div>
      </div>

      {/* Ball dropping animation */}
      {showBall && (
        <div
          key={ballKey}
          className="absolute pointer-events-none"
          style={{
            left: ballPos.x,
            top: 'calc(100vh - 134px)',
            zIndex: 15,
            transform: `translateX(${driftX + (rolling ? rollX : 0)}px)`,
            transition: rolling ? 'transform 5s ease-out' : 'none',
          }}
        >
          <div className={bounceDir === 'left' ? 'ball-bounce-left' : 'ball-bounce-right'}>
            <PixelBall className="w-12 h-12 drop-shadow-lg" />
          </div>
        </div>
      )}

      {/* Action buttons - very bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-8 px-4 z-20 bg-gradient-to-t from-amber-700/50 to-transparent">
        <div className="flex justify-center gap-3 max-w-md mx-auto">
          {ACTIONS.map((a) => (
            <button
              key={a.action}
              onClick={() => a.action === 'play' ? handlePlay() : onAction(a.action)}
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
