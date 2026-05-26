import axios from 'axios'
import { FieldValue } from 'firebase-admin/firestore'

import { validateTwitchEnv } from '../config/env.js'
import { db } from '../config/firebase.js'
import { mapTwitchStreamData } from '../mappers/streamMapper.js'
import Stream from '../models/Stream.js'
import { getStreamerById } from '../services/streamerService.js'
import { AppError } from '../utils/AppError.js'

const getAppAccessToken = async () => {
  const url = new URL('https://id.twitch.tv/oauth2/token')

  validateTwitchEnv()

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  })

  const response = await axios.post(url, params)

  const {
    data: { access_token, expires_in },
  } = response

  return { access_token, expires_in }
}

const ensureStreamerSubscription = async (twitchId) => {
  const streamer = await getStreamerById(twitchId)

  let onlineSubscriptionId = streamer.onlineSubscriptionId
  let offlineSubscriptionId = streamer.offlineSubscriptionId

  if (!onlineSubscriptionId) {
    const streamOnlineData = await createEventSubSubscription(
      'stream.online',
      twitchId,
    )

    onlineSubscriptionId = streamOnlineData.data[0]?.id

    if (!onlineSubscriptionId) {
      throw new AppError('Online subscription ID not found', 404)
    }
  }

  if (!offlineSubscriptionId) {
    const streamOfflineData = await createEventSubSubscription(
      'stream.offline',
      twitchId,
    )

    offlineSubscriptionId = streamOfflineData.data[0]?.id

    if (!offlineSubscriptionId) {
      throw new AppError('Offline subscription ID not found', 404)
    }
  }

  await db.collection('streamers').doc(twitchId).set(
    {
      onlineSubscriptionId,
      offlineSubscriptionId,
    },
    { merge: true },
  )

  console.log('Twitch subscription saved')

  return {
    onlineSubscriptionId,
    offlineSubscriptionId,
  }
}

const createEventSubSubscription = async (type, broadcasterUserId) => {
  const url = 'https://api.twitch.tv/helix/eventsub/subscriptions'

  validateTwitchEnv()

  const { access_token } = await getAppAccessToken()

  const headers = {
    'Content-Type': 'application/json',
    'Client-Id': process.env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${access_token}`,
  }

  const params = {
    type,
    version: '1',
    condition: {
      broadcaster_user_id: broadcasterUserId,
    },
    transport: {
      method: 'webhook',
      callback: 'https://diving-scrutiny-gladly.ngrok-free.dev/twitch/webhook',
      secret: process.env.WEBHOOK_SECRET,
    },
  }

  const res = await axios.post(url, params, {
    headers,
  })

  return res.data
}

const handleStreamOnline = async (event) => {
  const stream = mapTwitchStreamData(event)
  const streamData = Stream.parse(stream)
  const { streamerTwitchId, twitchStreamId, ...rest } = streamData

  await db
    .collection('streamers')
    .doc(streamerTwitchId)
    .collection('streams')
    .doc(twitchStreamId)
    .set({ twitchStreamId, ...rest })

  console.log('Stream saved!')
}

const handleStreamOffline = async (event) => {
  const { broadcaster_user_id } = event

  if (!broadcaster_user_id) {
    throw new AppError('Streamer not found', 404)
  }

  const streamsQuery = db
    .collection('streamers')
    .doc(broadcaster_user_id)
    .collection('streams')
    .where('status', '==', 'live')
    .limit(1)

  const querySnapshot = await streamsQuery.get()

  if (querySnapshot.empty) {
    throw new AppError('Live stream not found', 404)
  }

  const streamRef = querySnapshot.docs[0].ref

  await streamRef.update({
    status: 'ended',
    endedAt: FieldValue.serverTimestamp(),
  })

  console.log('Stream ended!')
}

export {
  createEventSubSubscription,
  ensureStreamerSubscription,
  getAppAccessToken,
  handleStreamOffline,
  handleStreamOnline,
}
