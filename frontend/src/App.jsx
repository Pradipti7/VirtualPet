import { useState, useEffect } from 'react'

function App() {
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pet')
      .then(res => res.json())
      .then(data => {
        setPet(data)
        setLoading(false)
      })
      .catch(() => {
        setPet({ name: 'Tamagotchi', hunger: 50, happiness: 50, energy: 50 })
        setLoading(false)
      })
  }, [])

  const updatePet = async (action) => {
    try {
      const res = await fetch(`/api/pet/${action}`, { method: 'POST' })
      const data = await res.json()
      setPet(data)
    } catch {
      setPet(prev => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 10),
        happiness: Math.min(100, prev.happiness + 10),
        energy: Math.min(100, prev.energy + 10)
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
        <span className="text-white text-2xl">Loading...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{pet.name}</h1>

        <div className="space-y-4 mb-8">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Hunger</span>
              <span>{pet.hunger}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-red-500 h-3 rounded-full transition-all" style={{width: `${pet.hunger}%`}}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Happiness</span>
              <span>{pet.happiness}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-500 h-3 rounded-full transition-all" style={{width: `${pet.happiness}%`}}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Energy</span>
              <span>{pet.energy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full transition-all" style={{width: `${pet.energy}%`}}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => updatePet('feed')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Feed
          </button>
          <button
            onClick={() => updatePet('play')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Play
          </button>
          <button
            onClick={() => updatePet('sleep')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
          >
            Sleep
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
