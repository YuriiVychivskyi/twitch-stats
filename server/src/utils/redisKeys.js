const activeStreamKey = (streamerTwitchId) => {
  return `streamer:${streamerTwitchId}:activeStream`
}
const streamStatsKey = (twitchStreamId) => {
  return `stream:${twitchStreamId}:stats`
}

export { activeStreamKey, streamStatsKey }
