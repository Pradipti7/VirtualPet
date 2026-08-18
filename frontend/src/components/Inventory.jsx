import Modal from './Modal'
import { MARKETPLACE_ITEMS, ROOM_POSITIONS } from '../data/marketplace'

function Inventory({ inventory, roomItems, onPlace, onRemove, onSell, onClose }) {
  const getItemData = (itemId) => MARKETPLACE_ITEMS.find(i => i.id === itemId)

  const handlePlace = (itemId) => {
    onPlace(itemId, { x: '50%', y: '75%' })
  }

  const handleRemove = (itemId) => {
    onRemove(itemId)
  }

  const handleSell = (itemId) => {
    const item = getItemData(itemId)
    if (item) {
      onSell(itemId, Math.floor(item.price / 2))
    }
  }

  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎒 Inventory</h2>
      </div>

      {(!inventory || inventory.length === 0) ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📦</div>
          <p>No items yet. Visit the marketplace to buy some!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {inventory.map((invItem, idx) => {
            const item = getItemData(invItem.itemId)
            if (!item) return null
            return (
              <div
                key={`${invItem.itemId}-${idx}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {invItem.placed ? '📍 Placed in room' : '📦 In inventory'}
                  </div>
                </div>
                <div className="flex gap-2">
                  {!invItem.placed ? (
                    <button
                      onClick={() => handlePlace(invItem.itemId)}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      Place
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemove(invItem.itemId)}
                      className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-lg font-medium transition-all hover:scale-105 active:scale-95"
                    >
                      Remove
                    </button>
                  )}
                  <button
                    onClick={() => handleSell(invItem.itemId)}
                    className="px-3 py-1.5 bg-red-400 hover:bg-red-500 text-white text-sm rounded-lg font-medium transition-all hover:scale-105 active:scale-95"
                  >
                    Sell 🪙{Math.floor(item.price / 2)}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

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

export default Inventory
