import { useState, useCallback, useRef } from "react"
import { FOOD_TYPES } from "../components/PixelFood"

const DROP_POSITIONS = [
  { x: 'calc(15vw - 24px)', vw: 15 },
  { x: 'calc(50vw - 24px)', vw: 50 },
  { x: 'calc(85vw - 24px)', vw: 85 },
]

export default function useFoodAnimation({ isFlying, onAction, getPetX, onReset }) {
  const [showFood, setShowFood] = useState(false)
  const [foodKey, setFoodKey] = useState(0)
  const [foodPos, setFoodPos] = useState({ x: 'calc(50vw - 24px)' })
  const [foodType, setFoodType] = useState('meat')
  const [foodDriftX, setFoodDriftX] = useState(0)
  const [foodBounceDir, setFoodBounceDir] = useState('left')
  const [foodPhase, setFoodPhase] = useState('idle')
  const [feeding, setFeeding] = useState(false)
  const [feedChaseTarget, setFeedChaseTarget] = useState({ x: '0px', y: 'calc(100vh - 240px)' })
  const [feedChaseSpeed, setFeedChaseSpeed] = useState(2)
  const [feedFaceRight, setFeedFaceRight] = useState(false)
  const timeoutsRef = useRef([])
  const isActiveRef = useRef(false)

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const resetFood = useCallback(() => {
    setShowFood(false)
    setFoodPhase('idle')
    setFeeding(false)
    isActiveRef.current = false
  }, [])

  const handleFeed = useCallback(() => {
    clearTimeouts()
    if (onReset) onReset()
    isActiveRef.current = true
    onAction('feed')
    const randomFood = FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)]
    const dropIdx = Math.floor(Math.random() * DROP_POSITIONS.length)
    const pos = DROP_POSITIONS[dropIdx]
    const drift = Math.floor(Math.random() * 60) - 30
    const dir = pos.vw < 50 ? 'right' : 'left'
    const dropPx = (pos.vw / 100) * window.innerWidth - 24
    const foodFinalX = Math.max(0, Math.min(window.innerWidth - 160, dropPx + drift))
    const y = isFlying ? 'calc(50vh - 80px)' : 'calc(100vh - 240px)'
    setFoodPos({ x: pos.x })
    setFoodDriftX(drift)
    setFoodKey((k) => k + 1)
    setFoodType(randomFood.name)
    setFoodBounceDir(dir)
    setFoodPhase('bounce')
    setShowFood(true)
    setFeeding(true)
    setFeedChaseSpeed(1.5)
    setFeedFaceRight(getPetX() < foodFinalX)
    setFeedChaseTarget({ x: `${foodFinalX}px`, y })

    const t = (fn, ms) => {
      const id = setTimeout(() => {
        if (!isActiveRef.current) return
        fn()
      }, ms)
      timeoutsRef.current.push(id)
      return id
    }

    t(() => {
      resetFood()
    }, 1500)
  }, [isFlying, onAction, getPetX, clearTimeouts, resetFood, onReset])

  return {
    showFood, foodKey, foodPos, foodType, foodDriftX, foodBounceDir,
    foodPhase, feeding, feedChaseTarget, feedChaseSpeed, feedFaceRight,
    handleFeed, reset: resetFood,
  }
}
