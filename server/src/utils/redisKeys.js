const activeStreamKey = (streamerTwitchId) => {
  return `streamer:${streamerTwitchId}:activeStream`
}
const streamStatsKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:stats`
}
const streamChattersKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:chatters`
}
const streamChatterMetadataKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:chatterMeta`
}

export {
  activeStreamKey,
  streamChatterMetadataKey,
  streamChattersKey,
  streamStatsKey,
}
