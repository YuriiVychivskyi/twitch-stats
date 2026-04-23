import { db } from '../config/firebase.js'
import { mapTwitchUserToStreamer } from '../mappers/streamerMapper.js'
import Streamer from '../models/Streamer.js'
import { getTwitchUserData } from './twitchService.js'

export const upsertStreamer = async function (url, params) {
  const response = await getTwitchUserData(url, params)

  const streamer = mapTwitchUserToStreamer(response)

  const streamerData = Streamer.parse(streamer)

  const { twitchId, ...rest } = streamerData

  await db
    .collection('streamers')
    .doc(twitchId)
    .set({ twitchId, ...rest }, { merge: true })

  console.log('User saved!')

  return streamerData
}
