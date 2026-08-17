import { useState, useEffect, useRef } from 'react'
import StatBar from '../components/StatBar'
import PetAvatar from '../components/PetAvatar'
import PixelBall from '../components/PixelBall'
import PixelFood, { FOOD_TYPES } from '../components/PixelFood'
import PixelEmoji, { EMOJI_TYPES } from '../components/PixelHeart'

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
  const [ballPhase, setBallPhase] = useState('idle')
  const [rollDir, setRollDir] = useState('left')
  const [bounceDir, setBounceDir] = useState('left')
  const [driftX, setDriftX] = useState(0)
  const [rollX, setRollX] = useState(0)
  const [rolling, setRolling] = useState(false)
  const [chasing, setChasing] = useState(false)
  const [chaseTarget, setChaseTarget] = useState({ x: '0px', y: 'calc(100vh - 240px)' })
  const [chaseSpeed, setChaseSpeed] = useState(2)
  const [chaseFaceRight, setChaseFaceRight] = useState(false)
  const [showFood, setShowFood] = useState(false)
  const [foodKey, setFoodKey] = useState(0)
  const [foodPos, setFoodPos] = useState({ x: 'calc(50vw - 24px)' })
  const [foodType, setFoodType] = useState('meat')
  const [foodDriftX, setFoodDriftX] = useState(0)
  const [foodRollX, setFoodRollX] = useState(0)
  const [foodRolling, setFoodRolling] = useState(false)
  const [foodRollDir, setFoodRollDir] = useState('left')
  const [foodBounceDir, setFoodBounceDir] = useState('left')
  const [foodPhase, setFoodPhase] = useState('idle')
  const [feeding, setFeeding] = useState(false)
  const [feedChaseTarget, setFeedChaseTarget] = useState({ x: '0px', y: 'calc(100vh - 240px)' })
  const [feedChaseSpeed, setFeedChaseSpeed] = useState(2)
  const [feedFaceRight, setFeedFaceRight] = useState(false)
  const [showHeartBubble, setShowHeartBubble] = useState(false)
  const [bubbleEmoji, setBubbleEmoji] = useState('heart')
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 18) return 'afternoon'
    if (hour >= 18 && hour < 21) return 'evening'
    return 'night'
  })
  const petRef = useRef(null)
  const isFlying = pet.type === 'bird'
  const corners = isFlying ? ALL_CORNERS : FLOOR_CORNERS
  const n = corners.length

  const DROP_POSITIONS = [
    { x: 'calc(15vw - 24px)', vw: 15 },
    { x: 'calc(50vw - 24px)', vw: 50 },
    { x: 'calc(85vw - 24px)', vw: 85 },
  ]

  const getPetX = () => {
    if (!petRef.current) return window.innerWidth / 2 - 80
    return petRef.current.getBoundingClientRect().left
  }

  const handlePetClick = () => {
    setBubbleEmoji(EMOJI_TYPES[Math.floor(Math.random() * EMOJI_TYPES.length)])
    setShowHeartBubble(true)
    setTimeout(() => setShowHeartBubble(false), 1500)
  }

  const handlePlay = () => {
    onAction('play')
    const dropIdx = Math.floor(Math.random() * DROP_POSITIONS.length)
    const pos = DROP_POSITIONS[dropIdx]
    const drift = Math.floor(Math.random() * 80) - 40
    const dir = pos.vw < 50 ? 'right' : 'left'
    const dropPx = (pos.vw / 100) * window.innerWidth - 24
    const newBounceDir = Math.random() < 0.5 ? 'left' : 'right'
    const bSign = newBounceDir === 'left' ? -1 : 1
    const clampedDrop = Math.max(0, Math.min(window.innerWidth - 160, dropPx + drift))
    const petDropX = Math.max(0, Math.min(window.innerWidth - 160, clampedDrop + bSign * 100))
    const petBounce1X = Math.max(0, Math.min(window.innerWidth - 160, clampedDrop + bSign * 130))
    const petBounce2X = Math.max(0, Math.min(window.innerWidth - 160, clampedDrop + bSign * 160))
    const petBounce3X = Math.max(0, Math.min(window.innerWidth - 160, clampedDrop + bSign * 202))
    const petBounce4X = Math.max(0, Math.min(window.innerWidth - 160, clampedDrop + bSign * 228))
    const rollDist = Math.min(
      dir === 'left' ? clampedDrop + 24 : window.innerWidth - clampedDrop - 184,
      500
    )
    const ballEndX = dir === 'left' ? clampedDrop - rollDist : clampedDrop + rollDist
    const petFinalX = Math.max(0, Math.min(window.innerWidth - 160,
      dir === 'left' ? ballEndX + 100 : ballEndX - 100
    ))
    const y = isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)'
    setBallPos({ x: pos.x })
    setDriftX(drift)
    setRollX(dir === 'left' ? -rollDist : rollDist)
    setBallKey((k) => k + 1)
    setBallPhase('bounce')
    setShowBall(true)
    setRollDir(dir)
    setBounceDir(newBounceDir)
    setRolling(false)
    setChasing(true)
    setChaseSpeed(2)
    setChaseFaceRight(getPetX() < petDropX)
    setChaseTarget({ x: `${petDropX}px`, y })
    setTimeout(() => { setChaseFaceRight(getPetX() < petBounce1X); setChaseTarget({ x: `${petBounce1X}px`, y }) }, 980)
    setTimeout(() => { setChaseFaceRight(getPetX() < petBounce2X); setChaseTarget({ x: `${petBounce2X}px`, y }) }, 1460)
    setTimeout(() => { setChaseFaceRight(getPetX() < petBounce3X); setChaseTarget({ x: `${petBounce3X}px`, y }) }, 1850)
    setTimeout(() => { setChaseFaceRight(getPetX() < petBounce4X); setChaseTarget({ x: `${petBounce4X}px`, y }) }, 2180)
    setTimeout(() => {
      setBallPhase('roll')
      setRolling(true)
      setChaseSpeed(5)
      setChaseFaceRight(getPetX() < petFinalX)
      setChaseTarget({ x: `${petFinalX}px`, y })
    }, 2800)
    setTimeout(() => {
      setBallPhase('rest')
      setTimeout(() => {
        setShowBall(false)
        setBallPhase('idle')
        setRolling(false)
        setChasing(false)
        setChaseSpeed(2)
      }, 2200)
    }, 7800)
  }

  const handleFeed = () => {
    onAction('feed')
    const randomFood = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)]
    const dropIdx = Math.floor(Math.random() * DROP_POSITIONS.length)
    const pos = DROP_POSITIONS[dropIdx]
    const drift = Math.floor(Math.random() * 60) - 30
    const dir = pos.vw < 50 ? 'right' : 'left'
    const dropPx = (pos.vw / 100) * window.innerWidth - 24
    const foodFinalX = Math.max(0, Math.min(window.innerWidth - 160, dropPx + drift))
    const petStartX = getPetX()
    const goingRight = petStartX < foodFinalX
    const step = goingRight ? 1 : -1
    const petDropX = Math.max(0, Math.min(window.innerWidth - 160, petStartX + step * 80))
    const petBounce1X = Math.max(0, Math.min(window.innerWidth - 160, petStartX + step * 130))
    const petBounce2X = Math.max(0, Math.min(window.innerWidth - 160, petStartX + step * 170))
    const petBounce3X = Math.max(0, Math.min(window.innerWidth - 160, petStartX + step * 200))
    const petBounce4X = Math.max(0, Math.min(window.innerWidth - 160, petStartX + step * 220))
    const petFinalX = foodFinalX
    const y = isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)'
    setFoodPos({ x: pos.x })
    setFoodDriftX(drift)
    setFoodRollX(0)
    setFoodKey((k) => k + 1)
    setFoodType(randomFood.name)
    setFoodRollDir(dir)
    setFoodBounceDir(dir)
    setFoodRolling(false)
    setFoodPhase('bounce')
    setShowFood(true)
    setFeeding(true)
    setFeedChaseSpeed(1.5)
    setFeedFaceRight(goingRight)
    setFeedChaseTarget({ x: `${petDropX}px`, y })
    setTimeout(() => { setFeedFaceRight(getPetX() < petBounce1X); setFeedChaseTarget({ x: `${petBounce1X}px`, y }) }, 980)
    setTimeout(() => { setFeedFaceRight(getPetX() < petBounce2X); setFeedChaseTarget({ x: `${petBounce2X}px`, y }) }, 1460)
    setTimeout(() => { setFeedFaceRight(getPetX() < petBounce3X); setFeedChaseTarget({ x: `${petBounce3X}px`, y }) }, 1850)
    setTimeout(() => { setFeedFaceRight(getPetX() < petBounce4X); setFeedChaseTarget({ x: `${petBounce4X}px`, y }) }, 2180)
    setTimeout(() => {
      setFoodPhase('rest')
      setFeedChaseSpeed(2)
      setFeedFaceRight(getPetX() < petFinalX)
      setFeedChaseTarget({ x: `${petFinalX}px`, y })
      setTimeout(() => {
        setShowFood(false)
        setFoodPhase('idle')
        setFoodRolling(false)
        setFeeding(false)
        setFeedChaseSpeed(2)
      }, 2000)
    }, 2800)
  }

  useEffect(() => {
    setCorner(1)
    setSitting(false)
    setMovingRight(true)
    let moves = 0
    const id = setInterval(() => {
      moves++
      if (moves % 3 === 0) {
        setSitting(true)
        setTimeout(() => setSitting(false), 4000)
      } else {
        setCorner((c) => {
          const next = (c + 1) % n
          setMovingRight(next % 2 === 1)
          return next
        })
      }
    }, 4000)
    return () => clearInterval(id)
  }, [n])

  useEffect(() => {
    const updateTime = () => {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 12) setTimeOfDay('morning')
      else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon')
      else if (hour >= 18 && hour < 21) setTimeOfDay('evening')
      else setTimeOfDay('night')
    }
    updateTime()
    const id = setInterval(updateTime, 60000)
    return () => clearInterval(id)
  }, [])

  const TIME_STYLES = {
    morning: {
      background: 'linear-gradient(180deg, #87CEEB 0%, #FFF8E1 55%, #D2B48C 55%, #C4A06A 100%)',
      skyColor: '#87CEEB',
    },
    afternoon: {
      background: 'linear-gradient(180deg, #4FC3F7 0%, #B3E5FC 55%, #D2B48C 55%, #C4A06A 100%)',
      skyColor: '#4FC3F7',
    },
    evening: {
      background: 'linear-gradient(180deg, #FF8A65 0%, #FFCCBC 55%, #D2B48C 55%, #C4A06A 100%)',
      skyColor: '#FF8A65',
    },
    night: {
      background: 'linear-gradient(180deg, #1A237E 0%, #283593 55%, #3E2723 55%, #4E342E 100%)',
      skyColor: '#1A237E',
    },
  }

  const pos = chasing
    ? chaseTarget
    : feeding
      ? feedChaseTarget
      : sitting
        ? { x: 'calc(50vw - 80px)', y: isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)' }
        : corners[corner]
  const flipRight = chasing
    ? chaseFaceRight
    : feeding
      ? feedFaceRight
      : !sitting && movingRight

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ background: TIME_STYLES[timeOfDay].background }}>
      {/* Sky elements */}
      {timeOfDay === 'morning' && (
        <div className="absolute top-8 right-12 w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_40px_15px_rgba(253,224,71,0.5)] z-0" />
      )}
      {timeOfDay === 'afternoon' && (
        <div className="absolute top-6 right-16 w-14 h-14 rounded-full bg-yellow-400 shadow-[0_0_50px_20px_rgba(255,235,59,0.4)] z-0" />
      )}
      {timeOfDay === 'evening' && (
        <>
          <div className="absolute top-10 right-20 w-12 h-12 rounded-full bg-orange-400 shadow-[0_0_30px_10px_rgba(255,152,0,0.4)] z-0" />
          <div className="absolute top-6 left-1/4 w-2 h-2 rounded-full bg-yellow-100 opacity-60 twinkle" />
          <div className="absolute top-12 left-1/3 w-1.5 h-1.5 rounded-full bg-yellow-100 opacity-50 twinkle" />
          <div className="absolute top-4 left-2/3 w-2 h-2 rounded-full bg-yellow-100 opacity-40 twinkle" />
        </>
      )}
      {timeOfDay === 'night' && (
        <>
          <div className="absolute top-8 right-16 w-10 h-10 rounded-full bg-gray-200 shadow-[0_0_20px_8px_rgba(200,200,255,0.3)] z-0" style={{ clipPath: 'circle(50% at 35% 35%)' }} />
          <div className="absolute top-6 left-1/4 w-2 h-2 rounded-full bg-white opacity-80 twinkle" />
          <div className="absolute top-14 left-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-60 twinkle" />
          <div className="absolute top-4 left-2/3 w-2 h-2 rounded-full bg-white opacity-70 twinkle" />
          <div className="absolute top-20 left-1/5 w-1 h-1 rounded-full bg-white opacity-50 twinkle" />
          <div className="absolute top-8 right-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-60 twinkle" />
          <div className="absolute top-24 right-1/4 w-1 h-1 rounded-full bg-white opacity-40 twinkle" />
          <div className="absolute top-2 left-1/2 w-1.5 h-1.5 rounded-full bg-white opacity-50 twinkle" />
        </>
      )}
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
        ref={petRef}
        className="pet-corner-walk z-10 cursor-pointer"
        onClick={handlePetClick}
        style={{
          position: 'absolute',
          left: pos.x,
          top: pos.y,
          transform: flipRight ? 'scaleX(-1)' : 'none',
          transition: chasing
            ? `left ${chaseSpeed}s ease-in-out, top ${chaseSpeed}s ease-in-out`
            : feeding
              ? `left ${feedChaseSpeed}s ease-in-out, top ${feedChaseSpeed}s ease-in-out`
              : 'left 4s ease-in-out, top 4s ease-in-out',
        }}
      >
        <div className={sitting ? '' : 'pet-bob'}>
          <PetAvatar type={pet.type} className="w-40 h-40 drop-shadow-lg" />
        </div>
        {showHeartBubble && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 pet-bubble-pop">
            <div className="bg-white/90 rounded-lg px-1.5 py-1 shadow-md relative">
              <PixelEmoji type={bubbleEmoji} petType={pet.type} className="w-6 h-6" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white/90 rotate-45 rounded-sm" />
            </div>
          </div>
        )}
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
            <div className={
              (ballPhase === 'roll' || ballPhase === 'rest')
                ? (rollDir === 'left' ? 'roll-left' : 'roll-right')
                : ''
            }>
              <PixelBall className="w-12 h-12 drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Food throwing animation */}
      {showFood && (
        <div
          key={foodKey}
          className="absolute pointer-events-none"
          style={{
            left: foodPos.x,
            top: 'calc(100vh - 134px)',
            zIndex: 15,
            transform: `translateX(${foodDriftX}px)`,
          }}
        >
          <div className={foodBounceDir === 'left' ? 'ball-bounce-left' : 'ball-bounce-right'}>
            <PixelFood type={foodType} className="w-12 h-12 drop-shadow-lg" />
          </div>
        </div>
      )}

      {/* Action buttons - very bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-8 px-4 z-20 bg-gradient-to-t from-amber-700/50 to-transparent">
        <div className="flex justify-center gap-3 max-w-md mx-auto">
          {ACTIONS.map((a) => (
            <button
              key={a.action}
              onClick={() => a.action === 'play' ? handlePlay() : a.action === 'feed' ? handleFeed() : onAction(a.action)}
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
