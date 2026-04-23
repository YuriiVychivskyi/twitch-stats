import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { errorHandler } from './middleware/errorHandler.js'
import apiRoutes from './routes/index.js'
import { AppError } from './utils/AppError.js'

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
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
