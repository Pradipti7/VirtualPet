import { ANIMALS } from '../data/animals'

function PetIntroPage({ pet, onReady }) {
  const animalEmoji = ANIMALS.find((a) => a.type === pet.type)?.emoji || '🐾'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full fade-in text-center">
        <span className="text-6xl block mb-4">{animalEmoji}</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Meet {pet.name}!</h1>
        <p className="text-gray-500 mb-6">Your new friend is ready for a home. Here's how to take care of them:</p>

        <div className="text-left space-y-3 mb-8">
          <div className="flex items-start gap-3 bg-orange-50 rounded-xl p-3">
            <span className="text-2xl">🍖</span>
            <p className="text-gray-700"><span className="font-semibold">Feed</span> them when they're hungry to keep their hunger bar up.</p>
          </div>
          <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
            <span className="text-2xl">⚽</span>
            <p className="text-gray-700"><span className="font-semibold">Play</span> with them to boost their happiness, but it uses energy.</p>
          </div>
          <div className="flex items-start gap-3 bg-purple-50 rounded-xl p-3">
            <span className="text-2xl">😴</span>
            <p className="text-gray-700"><span className="font-semibold">Let them sleep</span> when they're tired to restore their energy.</p>
          </div>
          <div className="flex items-start gap-3 bg-cyan-50 rounded-xl p-3">
            <span className="text-2xl">🛁</span>
            <p className="text-gray-700"><span className="font-semibold">Give them a bath</span> to keep them clean and happy.</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">Keep an eye on their stats — a happy pet is a well-balanced pet!</p>

        <button
          onClick={onReady}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
        >
          Start Caring for {pet.name}!
        </button>
      </div>
    </div>
  )
}

export default PetIntroPage
