import { getRedis } from '../config/redis.js'
import { AppError } from '../utils/appError.js'

export const preventEventSubReplay = async (req, res, next) => {
  const messageId = req.headers['twitch-eventsub-message-id']
  const messageTimestamp = Date.parse(
    req.headers['twitch-eventsub-message-timestamp'],
  )
  const currentTimestamp = Date.now()

  if (Number.isNaN(messageTimestamp))
    throw new AppError('Invalid message timestamp', 403)

  if (!messageId) throw new AppError('Missing required headers', 403)

  const timeDifference = Math.abs(currentTimestamp - messageTimestamp)

  if (timeDifference > 10 * 60 * 1000)
    throw new AppError('EventSub message is too old', 403)

  const redisClient = getRedis()

  const key = `eventsub:message:${messageId}`
  const result = await redisClient.set(key, 'processed', {
    NX: true,
    EX: 10 * 60,
  })

  if (result === null) {
    return res.sendStatus(204)
  }

  res.once('finish', () => {
    if (res.statusCode >= 400)
      redisClient.del(key).catch((error) => {
        console.error('Error deleting key from Redis:', error)
      })
  })

  next()
}
