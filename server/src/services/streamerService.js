import { db } from '../config/firebase.js'
import { mapTwitchUserToStreamer } from '../mappers/streamerMapper.js'
import StreamerSchema from '../schemas/streamerSchema.js'
import { AppError } from '../utils/appError.js'
import { ensureStreamerSubscriptions } from './eventSubService.js'
import { getTwitchUserData } from './twitchService.js'

const upsertStreamer = async function (url, params) {
  const response = await getTwitchUserData(url, params)

  const streamer = mapTwitchUserToStreamer(response)

  const streamerData = StreamerSchema.parse(streamer)

  const { twitchId, ...rest } = streamerData

  await db
    .collection('streamers')
    .doc(twitchId)
    .set({ twitchId, ...rest }, { merge: true })

  console.log('User saved!')

  await ensureStreamerSubscriptions(twitchId)

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

const getStreamerPublicProfile = async (streamerTwitchId) => {
  const streamerData = await getStreamerById(streamerTwitchId)

  if (!streamerData) {
    throw new AppError('Streamer not found', 404)
  }

  const { twitchId, login, displayName, profileImageUrl } = streamerData

  if (!twitchId || !login || !displayName) {
    throw new AppError('Streamer profile is incomplete', 500)
  }

  return {
    twitchId,
    login,
    displayName,
    profileImageUrl: profileImageUrl ?? null,
  }
}

export { getStreamerById, getStreamerPublicProfile, upsertStreamer }
