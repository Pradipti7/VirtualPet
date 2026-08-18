import { useState, useEffect, useCallback } from 'react'

const ALL_SYMBOLS = ['🐾', '🐱', '🐶', '🐰', '🐦', '🐹', '🦴', '🐟', '🍖', '⭐', '🎾', '🌙', '🌸', '🍄', '🧀', '🪺']

function getSymbolsForLevel(level) {
  let pairCount
  if (level === 1) pairCount = 2
  else if (level === 2) pairCount = 4
  else if (level === 3) pairCount = 6
  else pairCount = 8
  return ALL_SYMBOLS.slice(0, pairCount)
}

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createCards(level) {
  const symbols = getSymbolsForLevel(level)
  const pairs = [...symbols, ...symbols]
  const shuffled = shuffle(pairs)
  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    flipped: false,
    matched: false,
  }))
}

export default function MemoryGame({ level = 1, onComplete, onClose }) {
  const [cards, setCards] = useState(() => createCards(level))
  const [flippedIds, setFlippedIds] = useState([])
  const [matchedIds, setMatchedIds] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [checking, setChecking] = useState(false)

  const totalPairs = getSymbolsForLevel(level).length
  const isAllMatched = matchedIds.size === cards.length

  useEffect(() => {
    if (isAllMatched && !gameComplete) {
      setGameComplete(true)
    }
  }, [isAllMatched, gameComplete])

  const handleCardClick = useCallback((id) => {
    if (checking) return
    if (flippedIds.includes(id)) return
    if (matchedIds.has(id)) return

    const newFlipped = [...flippedIds, id]
    setFlippedIds(newFlipped)

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1)
      setChecking(true)
      const [firstId, secondId] = newFlipped
      const firstCard = cards.find((c) => c.id === firstId)
      const secondCard = cards.find((c) => c.id === secondId)

      if (firstCard.symbol === secondCard.symbol) {
        setMatchedIds((prev) => {
          const next = new Set(prev)
          next.add(firstId)
          next.add(secondId)
          return next
        })
        setFlippedIds([])
        setChecking(false)
      } else {
        setTimeout(() => {
          setFlippedIds([])
          setChecking(false)
        }, 800)
      }
    }
  }, [cards, flippedIds, matchedIds, checking])

  const handleRestart = () => {
    setCards(createCards(level))
    setFlippedIds([])
    setMatchedIds(new Set())
    setMoves(0)
    setGameComplete(false)
    setChecking(false)
  }

  const handleNextLevel = () => {
    onComplete(level)
    setCards(createCards(level + 1))
    setFlippedIds([])
    setMatchedIds(new Set())
    setMoves(0)
    setGameComplete(false)
    setChecking(false)
  }

  const cols = cards.length <= 4 ? 2 : cards.length <= 8 ? 4 : cards.length <= 12 ? 4 : 4

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Memory Match</h2>
            <p className="text-sm text-gray-500">Level {level} · {totalPairs} pairs · {moves} moves</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Game Complete Overlay */}
        {gameComplete && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center z-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Level {level} Complete!</h3>
            <p className="text-gray-600 mb-1">Moves: {moves}</p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🪙</span>
              <span className="text-lg font-bold text-amber-600">+5 Coins</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleNextLevel}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
              >
                Next Level →
              </button>
              <button
                onClick={() => { onComplete(level); onClose(); }}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Close Game
              </button>
            </div>
          </div>
        )}

        {/* Card Grid */}
        <div
          className="grid gap-3 mb-4"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {cards.map((card) => {
            const isFlipped = flippedIds.includes(card.id) || matchedIds.has(card.id)
            const isMatched = matchedIds.has(card.id)
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isFlipped || checking}
                className={`
                  aspect-square rounded-xl text-3xl font-medium
                  transition-all duration-200 transform
                  ${isMatched
                    ? 'bg-green-100 border-2 border-green-300 scale-95'
                    : isFlipped
                      ? 'bg-white border-2 border-blue-300 shadow-md'
                      : 'bg-gradient-to-br from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 hover:scale-105 active:scale-95 shadow-md cursor-pointer'
                  }
                  ${!isFlipped && !isMatched ? 'text-white' : ''}
                `}
              >
                {isFlipped ? card.symbol : '?'}
              </button>
            )
          })}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>Pairs: {matchedIds.size / 2}/{totalPairs}</span>
          <span>Moves: {moves}</span>
        </div>
      </div>
    </div>
  )
}
