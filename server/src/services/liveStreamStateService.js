import { getRedis } from '../config/redis.js'
import {
  activeStreamKey,
  streamChatterMetadataKey,
  streamChattersKey,
  streamStatsKey,
} from '../utils/redisKeys.js'

const initializeActiveStreamState = async (
  streamerTwitchId,
  twitchStreamId,
) => {
  const client = await getRedis()

  await client.set(activeStreamKey(streamerTwitchId), twitchStreamId)
  await client.hSet(streamStatsKey(twitchStreamId), {
    totalMessages: 0,
  })
}

const recordStreamMessage = async (
  streamerTwitchId,
  chatterTwitchId,
  chatterMeta,
) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId || !chatterTwitchId) return null

  await client.hIncrBy(streamStatsKey(twitchStreamId), 'totalMessages', 1)
  await client.hIncrBy(streamChattersKey(twitchStreamId), chatterTwitchId, 1)
  await client.hSet(
    streamChatterMetadataKey(twitchStreamId),
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
  const chatterStats = await client.hGetAll(streamChattersKey(twitchStreamId))
  const chatterMeta = await client.hGetAll(
    streamChatterMetadataKey(twitchStreamId),
  )

  const chatters = mapChatterStats(chatterStats, chatterMeta)

  return {
    twitchStreamId,
    totalMessages: Number(stats.totalMessages || 0),
    chatters,
  }
}

const clearActiveStreamState = async (streamerTwitchId) => {
  const client = await getRedis()
  const twitchStreamId = await client.get(activeStreamKey(streamerTwitchId))

  if (!twitchStreamId) return

  await client.del(activeStreamKey(streamerTwitchId))
  await client.del(streamStatsKey(twitchStreamId))
  await client.del(streamChattersKey(twitchStreamId))
  await client.del(streamChatterMetadataKey(twitchStreamId))
}

const mapChatterStats = (chatters, chatterMeta) => {
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
  clearActiveStreamState,
  getActiveStreamStats,
  initializeActiveStreamState,
  recordStreamMessage,
}
