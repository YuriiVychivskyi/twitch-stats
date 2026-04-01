import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import apiRoutes from './routes/index.js'

dotenv.config()
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))

app.use(express.json())

app.use('/api', apiRoutes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
