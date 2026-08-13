import { useState, useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import StoryPage from './pages/StoryPage'
import PetSelectionPage from './pages/PetSelectionPage'
import PetNamingPage from './pages/PetNamingPage'
import PetIntroPage from './pages/PetIntroPage'
import PetCarePage from './pages/PetCarePage'

function FieldWrapper({ children }) {
  return (
    <div className="min-h-screen field-bg flex items-center justify-center p-4">
      {children}
    </div>
  )
}

function App() {
  const [phase, setPhase] = useState('landing')
  const [pet, setPet] = useState(null)
  const [chosenAnimal, setChosenAnimal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pet')
      .then((res) => res.json())
      .then((data) => {
        if (data.adopted) {
          setPet(data)
          setPhase('ready')
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!pet) return
    const id = setInterval(() => {
      setPet((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 1),
        happiness: Math.max(0, prev.happiness - 2),
        energy: Math.max(0, prev.energy - 1),
        cleanliness: Math.max(0, prev.cleanliness - 1),
      }))
    }, 30000)
    return () => clearInterval(id)
  }, [pet !== null])

  const initPet = async (name) => {
    try {
      const res = await fetch('/api/pet/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type: chosenAnimal.type }),
      })
      const data = await res.json()
      setPet(data)
      setPhase('intro')
    } catch {
      setPet({
        name,
        type: chosenAnimal.type,
        hunger: 50,
        happiness: 50,
        energy: 50,
        cleanliness: 50,
        adopted: true,
      })
      setPhase('intro')
    }
  }

  const updatePet = async (action) => {
    try {
      const res = await fetch(`/api/pet/${action}`, { method: 'POST' })
      const data = await res.json()
      setPet(data)
    } catch {
      setPet((prev) => ({
        ...prev,
        hunger: Math.max(0, prev.hunger - 10),
        happiness: Math.min(100, prev.happiness + 10),
        energy: Math.min(100, prev.energy + 10),
        cleanliness: Math.max(0, (prev.cleanliness || 50) - 10),
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

  if (phase === 'intro' && pet) {
    return <PetIntroPage pet={pet} onReady={() => setPhase('ready')} />
  }

  if (phase === 'ready' && pet) {
    return <PetCarePage pet={pet} onAction={updatePet} />
  }

  if (phase === 'landing') {
    return <LandingPage onStart={() => setPhase('story1')} />
  }

  if (phase === 'story1' || phase === 'story2' || phase === 'story3') {
    return (
      <StoryPage
        phase={phase}
        chosenAnimal={chosenAnimal}
        onNext={(next) => setPhase(next)}
      />
    )
  }

  if (phase === 'choose') {
    return (
      <FieldWrapper>
        <PetSelectionPage
          onSelect={(animal) => {
            setChosenAnimal(animal)
            setPhase('story3')
          }}
        />
      </FieldWrapper>
    )
  }

  if (phase === 'name') {
    return (
      <FieldWrapper>
        <PetNamingPage chosenAnimal={chosenAnimal} onConfirm={initPet} />
      </FieldWrapper>
    )
  }

  return null
}

export default App
