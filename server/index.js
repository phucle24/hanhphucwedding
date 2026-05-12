import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001
const DATA_FILE = path.join(__dirname, 'wishes.json')

app.use(cors())
app.use(express.json())

// Serve static frontend files in production
app.use(express.static(path.join(__dirname, '../dist')))

// Initialize wishes file if not exists
if (!fs.existsSync(DATA_FILE)) {
  const initialWishes = [
    { id: 1, name: 'Hương', message: 'Mong rằng tình yêu của hai bạn mãi đẹp như ngày hôm nay!', emoji: '🎊', createdAt: new Date().toISOString() },
    { id: 2, name: 'Hiền', message: 'Tấn hôn hạnh phúc, trăm năm bền nhau!', emoji: '🕊️', createdAt: new Date().toISOString() },
    { id: 3, name: 'Thảo', message: 'Chúc hai bạn trăm năm hòa hợp, hạnh phúc!', emoji: '💐', createdAt: new Date().toISOString() },
    { id: 4, name: 'Việt Anh', message: 'Chúc hai bạn trăm năm hòa hợp, hạnh phúc!', emoji: '💐', createdAt: new Date().toISOString() },
    { id: 5, name: 'Hoàng Dũng', message: 'Chúc bạn trăm năm hạnh phúc!', emoji: '🎁', createdAt: new Date().toISOString() },
  ]
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialWishes, null, 2), 'utf-8')
}

// GET /api/wishes - Get all wishes
app.get('/api/wishes', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    const wishes = JSON.parse(data)
    res.json(wishes)
  } catch (err) {
    res.status(500).json({ error: 'Không thể đọc lời chúc' })
  }
})

// POST /api/wishes - Add a new wish
app.post('/api/wishes', (req, res) => {
  try {
    const { name, message, emoji } = req.body
    if (!name || !message) {
      return res.status(400).json({ error: 'Tên và lời chúc không được trống' })
    }

    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    const wishes = JSON.parse(data)

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      emoji: emoji || '💝',
      createdAt: new Date().toISOString(),
    }

    wishes.push(newWish)
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2), 'utf-8')

    res.status(201).json(newWish)
  } catch (err) {
    res.status(500).json({ error: 'Không thể lưu lời chúc' })
  }
})

// Fallback: serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
