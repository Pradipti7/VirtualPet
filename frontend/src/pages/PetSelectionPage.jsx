import Modal from '../components/Modal'
import PetCard from '../components/PetCard'
import { ANIMALS } from '../data/animals'

function PetSelectionPage({ onSelect }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center p-4">
      <Modal>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          You found a little friend!
        </h2>
        <p className="text-gray-500 text-center mb-6">Who did you discover?</p>
        <div className="grid grid-cols-5 gap-3">
          {ANIMALS.map((animal) => (
            <PetCard
              key={animal.type}
              emoji={animal.emoji}
              name={animal.name}
              onClick={() => onSelect(animal)}
            />
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default PetSelectionPage
