import axios from 'axios'

import { AppError } from '../utils/appError.js'

const refreshBotAccessToken = async () => {
  if (
    !process.env.TWITCH_BOT_CLIENT_ID ||
    !process.env.TWITCH_BOT_CLIENT_SECRET ||
    !process.env.TWITCH_BOT_REFRESH_TOKEN
  ) {
    throw new AppError('Bot env params error', 500)
  }

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_BOT_CLIENT_ID,
    client_secret: process.env.TWITCH_BOT_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: process.env.TWITCH_BOT_REFRESH_TOKEN,
  })

  const response = await axios.post('https://id.twitch.tv/oauth2/token', params)

  return response.data
}

export { refreshBotAccessToken }
