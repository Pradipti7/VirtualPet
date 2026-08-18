import { useState, useEffect, useRef } from 'react'

const BLOCK_COLORS = [
  '#ef4444', '#3b82f6', '#22c55e', '#eab308',
  '#a855f7', '#f97316', '#ec4899', '#06b6d4',
]

const FEEDBACKS = [
  { text: 'Nice!', color: '#22c55e' },
  { text: 'Good!', color: '#3b82f6' },
  { text: 'Great!', color: '#a855f7' },
  { text: 'Awesome!', color: '#f97316' },
  { text: 'Cool!', color: '#ec4899' },
  { text: 'Sweet!', color: '#06b6d4' },
  { text: 'Impressive!', color: '#eab308' },
  { text: 'Amazing!', color: '#ef4444' },
  { text: 'Wow!', color: '#22c55e' },
  { text: 'Perfect!', color: '#f97316' },
  { text: 'Fire!', color: '#ef4444' },
  { text: 'Let\'s go!', color: '#3b82f6' },
]

function BlockStacking({ level = 1, onComplete, onClose }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const animFrameRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const targetScore = 5 + (level - 1) * 3
  const canvasWidth = 320
  const canvasHeight = 400
  const blockHeight = 28
  const scrollThreshold = canvasHeight * 0.4

  const draw = (ctx, game) => {
    ctx.save()
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.translate(0, game.cameraY)

    for (const block of game.blocks) {
      ctx.fillStyle = block.color
      ctx.fillRect(block.x, block.y, block.width, blockHeight)
      ctx.strokeStyle = '#0f172a'
      ctx.lineWidth = 2
      ctx.strokeRect(block.x, block.y, block.width, blockHeight)
    }

    if (game.currentBlock && game.running) {
      const lastBlock = game.blocks[game.blocks.length - 1]
      ctx.fillStyle = game.currentBlock.color
      ctx.globalAlpha = 0.8
      ctx.fillRect(game.x, lastBlock.y - blockHeight, game.currentBlock.width, blockHeight)
      ctx.globalAlpha = 1
      ctx.strokeStyle = '#0f172a'
      ctx.lineWidth = 2
      ctx.strokeRect(game.x, lastBlock.y - blockHeight, game.currentBlock.width, blockHeight)
    }

    ctx.restore()

    const now = Date.now()
    game.floaters = game.floaters.filter(f => now - f.born < 1500)
    for (const f of game.floaters) {
      const age = (now - f.born) / 1500
      const alpha = 1 - age
      ctx.globalAlpha = alpha
      ctx.fillStyle = f.color
      ctx.font = `bold ${f.size}px sans-serif`
      ctx.textAlign = 'center'
      ctx.fillText(f.text, f.x, f.y - age * 60)
      ctx.globalAlpha = 1
    }

    ctx.fillStyle = 'white'
    ctx.font = 'bold 20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(`${game.score} / ${targetScore}`, canvasWidth / 2, 30)
  }

  const update = () => {
    const game = gameRef.current
    if (!game || !game.running) return

    game.x += game.speed * game.direction

    if (game.x + game.currentBlock.width > canvasWidth) {
      game.direction = -1
    } else if (game.x < 0) {
      game.direction = 1
    }

    if (game.blocks.length > 1) {
      const topBlock = game.blocks[game.blocks.length - 1]
      const screenY = topBlock.y + game.cameraY
      if (screenY < scrollThreshold) {
        game.cameraY = scrollThreshold - topBlock.y
      }
    }

    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) draw(ctx, game)

    animFrameRef.current = requestAnimationFrame(update)
  }

  const spawnFeedback = (score) => {
    const game = gameRef.current
    if (!game) return

    const shouldShow = score === 1 || score === 3 || score === 5 || score % 3 === 0 || Math.random() < 0.3
    if (!shouldShow) return

    const fb = FEEDBACKS[Math.floor(Math.random() * FEEDBACKS.length)]
    game.floaters.push({
      text: fb.text,
      color: fb.color,
      x: 40 + Math.random() * (canvasWidth - 80),
      y: 100 + Math.random() * 80,
      size: 18 + Math.floor(Math.random() * 10),
      born: Date.now(),
    })
  }

  const initGame = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)

    const game = {
      blocks: [],
      currentBlock: null,
      score: 0,
      speed: 1.5 + Math.min(level * 0.3, 2),
      direction: 1,
      x: canvasWidth / 2 - 60,
      running: true,
      floaters: [],
      cameraY: 0,
    }

    game.blocks.push({
      x: canvasWidth / 2 - 60,
      y: canvasHeight - blockHeight,
      width: 120,
      color: BLOCK_COLORS[0],
    })

    game.currentBlock = {
      width: 120,
      color: BLOCK_COLORS[1 % BLOCK_COLORS.length],
    }

    gameRef.current = game
    setScore(0)
    setGameComplete(false)
    setGameOver(false)

    animFrameRef.current = requestAnimationFrame(update)
  }

  useEffect(() => {
    initGame()
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [level])

  const placeBlock = () => {
    const game = gameRef.current
    if (!game || !game.running || !game.currentBlock) return

    const lastBlock = game.blocks[game.blocks.length - 1]
    const overlapLeft = Math.max(game.x, lastBlock.x)
    const overlapRight = Math.min(game.x + game.currentBlock.width, lastBlock.x + lastBlock.width)
    const overlap = overlapRight - overlapLeft

    if (overlap <= 10) {
      game.running = false
      setGameOver(true)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    game.blocks.push({
      x: overlapLeft,
      y: lastBlock.y - blockHeight,
      width: overlap,
      color: game.currentBlock.color,
    })

    game.score++
    setScore(game.score)
    spawnFeedback(game.score)

    if (game.score >= targetScore) {
      game.running = false
      setGameComplete(true)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      return
    }

    game.currentBlock = {
      width: overlap,
      color: BLOCK_COLORS[(game.blocks.length) % BLOCK_COLORS.length],
    }
    game.x = canvasWidth / 2 - overlap / 2
    game.speed = Math.min(game.speed + 0.08, 6)
  }

  const handleNextLevel = () => {
    onComplete(level)
    initGame()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Block Stack</h2>
            <p className="text-sm text-gray-500">Level {level} · Stack {targetScore} blocks</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {gameComplete && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center z-10">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Level {level} Complete!</h3>
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

        {gameOver && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl flex flex-col items-center justify-center z-10">
            <div className="text-5xl mb-4">💫</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Game Over!</h3>
            <p className="text-gray-600 mb-4">Score: {score} / {targetScore}</p>
            <div className="flex gap-3">
              <button
                onClick={initGame}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="rounded-xl border-2 border-gray-200"
            style={{ cursor: gameOver || gameComplete ? 'default' : 'pointer' }}
            onClick={!gameOver && !gameComplete ? placeBlock : undefined}
          />
        </div>

        <p className="text-center text-sm text-gray-500 mt-3">
          Tap to place the block!
        </p>
      </div>
    </div>
  )
}

export default BlockStacking
