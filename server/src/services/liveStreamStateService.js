import { getRedis } from '../config/redis.js'
import { activeStreamKey, streamStatsKey } from '../utils/redisKeys.js'

const addActiveStream = async (streamerTwitchId, twitchStreamId) => {
  const client = await getRedis()

  await client.set(activeStreamKey(streamerTwitchId), twitchStreamId)
  await client.hSet(streamStatsKey(twitchStreamId), {
    totalMessages: 0,
  })
}

const incrementStreamMessages = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId) return null

  return client.hIncrBy(streamStatsKey(twitchStreamId), 'totalMessages', 1)
}

const getActiveStreamStats = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))
  if (!twitchStreamId) return null

  const stats = await client.hGetAll(streamStatsKey(twitchStreamId))

  return { twitchStreamId, totalMessages: Number(stats.totalMessages || 0) }
}

const removeActiveStream = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId) return null

  const stats = await client.hGetAll(streamStatsKey(twitchStreamId))

  await client.del(activeStreamKey(streamerTwitchId))
  await client.del(streamStatsKey(twitchStreamId))

  return { twitchStreamId, totalMessages: Number(stats.totalMessages || 0) }
}

export {
  addActiveStream,
  getActiveStreamStats,
  incrementStreamMessages,
  removeActiveStream,
}
