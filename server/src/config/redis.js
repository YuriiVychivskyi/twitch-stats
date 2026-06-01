import { createClient } from 'redis'

let redisClient = null

export const connectRedis = async () => {
  if (redisClient?.isOpen) {
    return redisClient
  }

  redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  })

  redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err)
  })

  redisClient.on('connect', () => {
    console.log('Redis connecting...')
  })

  redisClient.on('ready', () => {
    console.log('Redis ready')
  })

  await redisClient.connect()

  return redisClient
}

export const getRedis = () => {
  if (!redisClient) {
    throw new Error('Redis is not connected')
  }

  return redisClient
}
