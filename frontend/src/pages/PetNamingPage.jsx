import { useState } from 'react'
import Modal from '../components/Modal'

function PetNamingPage({ chosenAnimal, onConfirm }) {
  const [petName, setPetName] = useState('')

  const handleSubmit = () => {
    if (petName.trim()) {
      onConfirm(petName.trim())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center p-4">
      <Modal>
        <div className="text-center">
          <span className="text-6xl block mb-4">{chosenAnimal.emoji}</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Name your new friend!</h2>
          <p className="text-gray-500 mb-6">
            What would you like to call your {chosenAnimal.name.toLowerCase()}?
          </p>
          <input
            type="text"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter a name..."
            maxLength={20}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-center text-lg focus:outline-none focus:border-emerald-400 transition-colors mb-4"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit()
            }}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!petName.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-xl text-lg transition-colors"
          >
            Bring Home!
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PetNamingPage
