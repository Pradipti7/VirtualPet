const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

let pet = {
  name: 'Tamagotchi',
  type: 'cat',
  hunger: 50,
  happiness: 50,
  energy: 50,
  cleanliness: 50,
  coins: 0,
  adopted: false,
  inventory: [],
  roomItems: []
}

app.get('/api/pet', (req, res) => {
  res.json(pet)
})

app.post('/api/pet/init', (req, res) => {
  const { name, type } = req.body
  pet = {
    name: name || 'Buddy',
    type: type || 'cat',
    hunger: 50,
    happiness: 50,
    energy: 50,
    cleanliness: 50,
    coins: 0,
    adopted: true,
    inventory: [],
    roomItems: []
  }
  res.json(pet)
})

app.post('/api/pet/feed', (req, res) => {
  pet.hunger = Math.max(0, pet.hunger - 15)
  pet.happiness = Math.min(100, pet.happiness + 5)
  res.json(pet)
})

app.post('/api/pet/play', (req, res) => {
  pet.happiness = Math.min(100, pet.happiness + 15)
  pet.energy = Math.max(0, pet.energy - 10)
  pet.hunger = Math.min(100, pet.hunger + 5)
  pet.cleanliness = Math.max(0, pet.cleanliness - 10)
  res.json(pet)
})

app.post('/api/pet/sleep', (req, res) => {
  pet.energy = Math.min(100, pet.energy + 20)
  pet.hunger = Math.min(100, pet.hunger + 10)
  res.json(pet)
})

app.post('/api/pet/bath', (req, res) => {
  pet.cleanliness = Math.min(100, pet.cleanliness + 25)
  pet.happiness = Math.min(100, pet.happiness + 5)
  res.json(pet)
})

app.post('/api/pet/minigame-reward', (req, res) => {
  const { coins } = req.body
  pet.coins = (pet.coins || 0) + (coins || 0)
  pet.happiness = Math.min(100, pet.happiness + 5)
  res.json(pet)
})

app.post('/api/pet/buy-item', (req, res) => {
  const { itemId, price } = req.body
  if (!itemId || !price) {
    return res.status(400).json({ error: 'itemId and price required' })
  }
  if ((pet.coins || 0) < price) {
    return res.status(400).json({ error: 'Not enough coins' })
  }
  pet.coins = pet.coins - price
  pet.inventory = [...(pet.inventory || []), { itemId, placed: false }]
  res.json(pet)
})

app.post('/api/pet/sell-item', (req, res) => {
  const { itemId } = req.body
  if (!itemId) {
    return res.status(400).json({ error: 'itemId required' })
  }
  const invIndex = pet.inventory.findIndex(i => i.itemId === itemId)
  if (invIndex === -1) {
    return res.status(400).json({ error: 'Item not in inventory' })
  }
  pet.inventory.splice(invIndex, 1)
  pet.roomItems = (pet.roomItems || []).filter(i => i.itemId !== itemId)
  res.json(pet)
})

app.post('/api/pet/place-item', (req, res) => {
  const { itemId, position } = req.body
  if (!itemId || !position) {
    return res.status(400).json({ error: 'itemId and position required' })
  }
  pet.roomItems = [...(pet.roomItems || []).filter(i => i.itemId !== itemId), { itemId, ...position }]
  const invItem = pet.inventory.find(i => i.itemId === itemId)
  if (invItem) invItem.placed = true
  res.json(pet)
})

app.post('/api/pet/remove-item', (req, res) => {
  const { itemId } = req.body
  if (!itemId) {
    return res.status(400).json({ error: 'itemId required' })
  }
  pet.roomItems = (pet.roomItems || []).filter(i => i.itemId !== itemId)
  const invItem = pet.inventory.find(i => i.itemId === itemId)
  if (invItem) invItem.placed = false
  res.json(pet)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
