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
  adopted: false
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
    adopted: true
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
