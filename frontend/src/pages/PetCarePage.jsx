import { useState, useEffect, useRef } from 'react'
import PetAvatar from '../components/PetAvatar'
import PixelBall from '../components/PixelBall'
import PixelFood from '../components/PixelFood'
import PixelEmoji, { EMOJI_TYPES } from '../components/PixelHeart'
import SkyElements from '../components/SkyElements'
import PetStatsPanel from '../components/PetStatsPanel'
import ActionButtons from '../components/ActionButtons'
import MemoryGame from '../components/MemoryGame'
import useBallAnimation from '../hooks/useBallAnimation'
import useFoodAnimation from '../hooks/useFoodAnimation'

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

const TIME_STYLES = {
  morning: {
    background: 'linear-gradient(180deg, #87CEEB 0%, #FFF8E1 55%, #D2B48C 55%, #C4A06A 100%)',
  },
  afternoon: {
    background: 'linear-gradient(180deg, #4FC3F7 0%, #B3E5FC 55%, #D2B48C 55%, #C4A06A 100%)',
  },
  evening: {
    background: 'linear-gradient(180deg, #FF8A65 0%, #FFCCBC 55%, #D2B48C 55%, #C4A06A 100%)',
  },
  night: {
    background: 'linear-gradient(180deg, #1A237E 0%, #283593 55%, #3E2723 55%, #4E342E 100%)',
  },
}

function PetCarePage({ pet, onAction, onMiniGameReward }) {
  const [corner, setCorner] = useState(1)
  const [sitting, setSitting] = useState(false)
  const [movingRight, setMovingRight] = useState(false)
  const [showHeartBubble, setShowHeartBubble] = useState(false)
  const [bubbleEmoji, setBubbleEmoji] = useState('heart')
  const [growthLevel, setGrowthLevel] = useState(1)
  const [showGrowthNotif, setShowGrowthNotif] = useState(false)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const [miniGameLevel, setMiniGameLevel] = useState(1)
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

  const getPetX = () => {
    if (!petRef.current) return window.innerWidth / 2 - 80
    return petRef.current.getBoundingClientRect().left
  }

  const handlePetClick = () => {
    setBubbleEmoji(EMOJI_TYPES[Math.floor(Math.random() * EMOJI_TYPES.length)])
    setShowHeartBubble(true)
    setTimeout(() => setShowHeartBubble(false), 1500)
  }

  const ball = useBallAnimation({ isFlying, onAction, getPetX })
  const food = useFoodAnimation({ isFlying, onAction, getPetX })

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

  useEffect(() => {
    const id = setInterval(() => {
      setGrowthLevel((prev) => {
        if (prev >= 5) return prev
        const next = prev + 1
        setShowGrowthNotif(true)
        setTimeout(() => setShowGrowthNotif(false), 2500)
        return next
      })
    }, 60000)
    return () => clearInterval(id)
  }, [])

  const petScale = 1 + (growthLevel - 1) * 0.15

  const handleMiniGameComplete = (level) => {
    onMiniGameReward(5)
    setMiniGameLevel(level + 1)
  }

  const handleOpenMiniGame = () => {
    setShowMiniGame(true)
  }

  const handleCloseMiniGame = () => {
    setShowMiniGame(false)
  }

  const pos = ball.chasing
    ? ball.chaseTarget
    : food.feeding
      ? food.feedChaseTarget
      : sitting
        ? { x: 'calc(50vw - 80px)', y: isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)' }
        : corners[corner]
  const flipRight = ball.chasing
    ? ball.chaseFaceRight
    : food.feeding
      ? food.feedFaceRight
      : !sitting && movingRight

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ background: TIME_STYLES[timeOfDay].background }}>
      <SkyElements timeOfDay={timeOfDay} />
      <PetStatsPanel pet={pet} />

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
          transform: flipRight
            ? `scale(${petScale}) scaleX(-1)`
            : `scale(${petScale})`,
          transformOrigin: 'bottom center',
          transition: ball.chasing
            ? `left ${ball.chaseSpeed}s ease-in-out, top ${ball.chaseSpeed}s ease-in-out`
            : food.feeding
              ? `left ${food.feedChaseSpeed}s ease-in-out, top ${food.feedChaseSpeed}s ease-in-out`
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

      {/* Growth notification */}
      {showGrowthNotif && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pet-bubble-pop">
          <div className="bg-white/95 backdrop-blur rounded-xl px-4 py-2 shadow-lg flex items-center gap-2">
            <span className="text-2xl">🌟</span>
            <span className="text-sm font-bold text-gray-800">{pet.name} grew to level {growthLevel}!</span>
          </div>
        </div>
      )}

      {/* Ball dropping animation */}
      {ball.showBall && (
        <div
          key={ball.ballKey}
          className="absolute pointer-events-none"
          style={{
            left: ball.ballPos.x,
            top: 'calc(100vh - 134px)',
            zIndex: 15,
            transform: `translateX(${ball.driftX + (ball.rolling ? ball.rollX : 0)}px)`,
            transition: ball.rolling ? 'transform 5s ease-out' : 'none',
          }}
        >
          <div className={ball.bounceDir === 'left' ? 'ball-bounce-left' : 'ball-bounce-right'}>
            <div className={
              (ball.ballPhase === 'roll' || ball.ballPhase === 'rest')
                ? (ball.rollDir === 'left' ? 'roll-left' : 'roll-right')
                : ''
            }>
              <PixelBall className="w-12 h-12 drop-shadow-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Food throwing animation */}
      {food.showFood && (
        <div
          key={food.foodKey}
          className="absolute pointer-events-none"
          style={{
            left: food.foodPos.x,
            top: 'calc(100vh - 134px)',
            zIndex: 15,
            transform: `translateX(${food.foodDriftX}px)`,
          }}
        >
          <div className={food.foodBounceDir === 'left' ? 'ball-bounce-left' : 'ball-bounce-right'}>
            <PixelFood type={food.foodType} className="w-12 h-12 drop-shadow-lg" />
          </div>
        </div>
      )}

      <ActionButtons onPlay={ball.handlePlay} onFeed={food.handleFeed} onAction={onAction} onGames={handleOpenMiniGame} />

      {/* Memory Game Overlay */}
      {showMiniGame && (
        <MemoryGame
          level={miniGameLevel}
          onComplete={handleMiniGameComplete}
          onClose={handleCloseMiniGame}
        />
      )}
    </div>
  )
}

export default PetCarePage
