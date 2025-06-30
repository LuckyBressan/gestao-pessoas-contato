import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import peopleRoutes from './routes/people.routes'
import contactsRoutes from './routes/contacts.routes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/people', peopleRoutes)
app.use('/api/contacts', contactsRoutes)

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`🚀 Servidor executando em http://localhost:${PORT}`)
})
