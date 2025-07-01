import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes'
import peopleRoutes from './routes/people.routes'
import contactsRoutes from './routes/contacts.routes'
import { authenticateToken } from './middlewares/authMiddleware'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/people', authenticateToken, peopleRoutes)
app.use('/api/contacts', authenticateToken, contactsRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`🚀 Servidor executando em http://localhost:${PORT}`)
})
