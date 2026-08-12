function PetCard({ emoji, name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="pet-card flex flex-col items-center p-4 rounded-2xl border-2 border-gray-100 hover:border-emerald-400 bg-gray-50 cursor-pointer"
    >
      <span className="text-4xl mb-1">{emoji}</span>
      <span className="text-sm font-medium text-gray-600">{name}</span>
    </button>
  )
}

export default PetCard
