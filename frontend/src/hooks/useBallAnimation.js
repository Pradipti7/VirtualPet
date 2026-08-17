import { useState, useCallback, useRef } from "react"

const DROP_POSITIONS = [
  { x: 'calc(15vw - 24px)', vw: 15 },
  { x: 'calc(50vw - 24px)', vw: 50 },
  { x: 'calc(85vw - 24px)', vw: 85 },
]

export default function useBallAnimation({ isFlying, onAction, getPetX }) {
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
  const timeoutsRef = useRef([])

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const handlePlay = useCallback(() => {
    clearTimeouts()
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

    const t = (fn, ms) => {
      const id = setTimeout(fn, ms)
      timeoutsRef.current.push(id)
      return id
    }

    t(() => { setChaseFaceRight(getPetX() < petBounce1X); setChaseTarget({ x: `${petBounce1X}px`, y }) }, 980)
    t(() => { setChaseFaceRight(getPetX() < petBounce2X); setChaseTarget({ x: `${petBounce2X}px`, y }) }, 1460)
    t(() => { setChaseFaceRight(getPetX() < petBounce3X); setChaseTarget({ x: `${petBounce3X}px`, y }) }, 1850)
    t(() => { setChaseFaceRight(getPetX() < petBounce4X); setChaseTarget({ x: `${petBounce4X}px`, y }) }, 2180)
    t(() => {
      setBallPhase('roll')
      setRolling(true)
      setChaseSpeed(5)
      setChaseFaceRight(getPetX() < petFinalX)
      setChaseTarget({ x: `${petFinalX}px`, y })
    }, 2800)
    t(() => {
      setBallPhase('rest')
      t(() => {
        setShowBall(false)
        setBallPhase('idle')
        setRolling(false)
        setChasing(false)
        setChaseSpeed(2)
      }, 2200)
    }, 7800)
  }, [isFlying, onAction, getPetX, clearTimeouts])

  return {
    showBall, ballKey, ballPos, ballPhase, rollDir, bounceDir,
    driftX, rollX, rolling, chasing, chaseTarget, chaseSpeed, chaseFaceRight,
    handlePlay,
  }
}
