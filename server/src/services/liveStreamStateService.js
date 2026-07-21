import { getRedis } from '../config/redis.js'
import {
  activeStreamKey,
  streamChatterKey,
  streamChatterMetaKey,
  streamStatsKey,
} from '../utils/redisKeys.js'

const addActiveStream = async (streamerTwitchId, twitchStreamId) => {
  const client = await getRedis()

  await client.set(activeStreamKey(streamerTwitchId), twitchStreamId)
  await client.hSet(streamStatsKey(twitchStreamId), {
    totalMessages: 0,
  })
}

const trackStreamMessage = async (
  streamerTwitchId,
  chatterTwitchId,
  chatterMeta,
) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId || !chatterTwitchId) return null

  await client.hIncrBy(streamStatsKey(twitchStreamId), 'totalMessages', 1)
  await client.hIncrBy(streamChatterKey(twitchStreamId), chatterTwitchId, 1)
  await client.hSet(
    streamChatterMetaKey(twitchStreamId),
    chatterTwitchId,
    JSON.stringify(chatterMeta),
  )

  return null
}

const getActiveStreamStats = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))
  if (!twitchStreamId) return null

  const stats = await client.hGetAll(streamStatsKey(twitchStreamId))
  const chatterStats = await client.hGetAll(streamChatterKey(twitchStreamId))
  const chatterMeta = await client.hGetAll(streamChatterMetaKey(twitchStreamId))

  const chatters = formatChatters(chatterStats, chatterMeta)

  return {
    twitchStreamId,
    totalMessages: Number(stats.totalMessages || 0),
    chatters,
  }
}

const removeActiveStream = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId) return

  await client.del(activeStreamKey(streamerTwitchId))
  await client.del(streamStatsKey(twitchStreamId))
  await client.del(streamChatterKey(twitchStreamId))
  await client.del(streamChatterMetaKey(twitchStreamId))
}

const formatChatters = (chatters, chatterMeta) => {
  const result = []

  for (const [chatterTwitchId, messagesCount] of Object.entries(chatters)) {
    const metaJson = chatterMeta[chatterTwitchId]
    const meta = metaJson ? JSON.parse(metaJson) : {}

    result.push({
      chatterTwitchId,
      messagesCount: Number(messagesCount),
      ...meta,
    })
  }

  return result
}

export {
  addActiveStream,
  getActiveStreamStats,
  removeActiveStream,
  trackStreamMessage,
}
