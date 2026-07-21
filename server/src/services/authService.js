import { validateTwitchEnv } from '../config/env.js'
import { AppError } from '../utils/appError.js'
import { upsertStreamer } from './streamerService.js'

const getTwitchAuthUrl = () => {
  const url = new URL('https://id.twitch.tv/oauth2/authorize')

  validateTwitchEnv()

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    response_type: 'code',
    scope: 'user:read:email',
    redirect_uri: process.env.TWITCH_CALLBACK_URL,
  })

  return `${url.toString()}?${params.toString()}`
}

const handleTwitchCallback = async (code) => {
  const url = new URL('https://id.twitch.tv/oauth2/token')

  if (!code) throw new AppError('Code params error', 400)

  validateTwitchEnv()

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID,
    client_secret: process.env.TWITCH_CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.TWITCH_CALLBACK_URL,
  })

  const streamer = await upsertStreamer(url, params)

  return streamer
}

export { getTwitchAuthUrl, handleTwitchCallback }
