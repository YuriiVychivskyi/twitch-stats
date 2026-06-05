const activeStreamKey = (streamerTwitchId) => {
  return `streamer:${streamerTwitchId}:activeStream`
}
const streamStatsKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:stats`
}
const streamChatterKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:chatters`
}
const streamChatterMetaKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:chatterMeta`
}

export {
  activeStreamKey,
  streamChatterKey,
  streamChatterMetaKey,
  streamStatsKey,
}
