import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import { connectRedis } from './config/redis.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/authRoutes.js'
import eventSubRoutes from './routes/eventSubRoutes.js'
import liveStreamStatsRoutes from './routes/liveStreamStatsRoutes.js'
import streamerRoutes from './routes/streamerRoutes.js'
import { connectBot } from './services/botService.js'
import { AppError } from './utils/appError.js'

dotenv.config()
const app = express()
await connectRedis()
await connectBot()

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    },
  }),
)

app.use('/api', authRoutes)
app.use('/api', liveStreamStatsRoutes)
app.use('/api', streamerRoutes)
app.use('/', eventSubRoutes)

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
