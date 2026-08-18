import { useState } from 'react'
import Modal from './Modal'
import { MARKETPLACE_ITEMS, CATEGORIES } from '../data/marketplace'

function Marketplace({ coins, inventory, onBuy, onClose }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [buying, setBuying] = useState(null)

  const filteredItems = activeCategory === 'all'
    ? MARKETPLACE_ITEMS
    : MARKETPLACE_ITEMS.filter(i => i.category === activeCategory)

  const ownedIds = (inventory || []).map(i => i.itemId)

  const handleBuy = async (item) => {
    if (coins < item.price || buying) return
    setBuying(item.id)
    const success = await onBuy(item.id, item.price)
    setBuying(null)
  }

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏪 Marketplace</h2>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-xl">🪙</span>
          <span className="text-lg font-bold text-amber-600">{coins}</span>
          <span className="text-sm text-gray-500">coins</span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
        {filteredItems.map(item => {
          const owned = ownedIds.includes(item.id)
          const canAfford = coins >= item.price
          return (
            <div
              key={item.id}
              className={`relative p-3 rounded-xl border-2 transition-all ${
                owned
                  ? 'border-green-400 bg-green-50'
                  : canAfford
                    ? 'border-amber-200 bg-white hover:border-amber-400 hover:shadow-md cursor-pointer'
                    : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
              onClick={() => !owned && handleBuy(item)}
            >
              {owned && (
                <span className="absolute top-1 right-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">Owned</span>
              )}
              <div className="text-3xl mb-1">{item.emoji}</div>
              <div className="font-medium text-sm text-gray-800">{item.name}</div>
              <div className="text-xs text-gray-500 mb-2">{item.description}</div>
              <div className="flex items-center gap-1">
                <span className="text-sm">🪙</span>
                <span className={`font-bold text-sm ${owned ? 'text-green-600' : canAfford ? 'text-amber-600' : 'text-gray-400'}`}>
                  {item.price}
                </span>
              </div>
              {!owned && canAfford && buying === item.id && (
                <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center">
                  <span className="text-sm text-gray-600">Buying...</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all hover:scale-105 active:scale-95"
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

export default Marketplace
