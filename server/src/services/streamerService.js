import { db } from '../config/firebase.js'
import { mapTwitchUserToStreamer } from '../mappers/streamerMapper.js'
import Streamer from '../models/Streamer.js'
import { AppError } from '../utils/AppError.js'
import { ensureStreamerSubscription } from './eventSubService.js'
import { getTwitchUserData } from './twitchService.js'

const upsertStreamer = async function (url, params) {
  const response = await getTwitchUserData(url, params)

  const streamer = mapTwitchUserToStreamer(response)

  const streamerData = Streamer.parse(streamer)

  const { twitchId, ...rest } = streamerData

  await db
    .collection('streamers')
    .doc(twitchId)
    .set({ twitchId, ...rest }, { merge: true })

  console.log('User saved!')

  await ensureStreamerSubscription(twitchId)

  return streamerData
}

const getStreamerById = async (twitchId) => {
  if (!twitchId) throw new AppError('Invalid streamer id', 400)

  const docRef = db.collection('streamers').doc(twitchId)
  const snapshot = await docRef.get()

  if (!snapshot.exists) {
    throw new AppError('Streamer not found', 404)
  }

  return snapshot.data()
}

export { getStreamerById, upsertStreamer }
