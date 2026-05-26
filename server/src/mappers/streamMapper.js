export const mapTwitchStreamData = (event) => {
  const { id, broadcaster_user_id, type, started_at } = event

  return {
    twitchStreamId: id,
    streamerTwitchId: broadcaster_user_id,
    startedAt: new Date(started_at),
    status: type,
  }
}
