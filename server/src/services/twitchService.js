import axios from 'axios'

import { validateTwitchEnv } from '../config/env.js'
import { AppError } from '../utils/AppError.js'

export const getTwitchUserData = async (url, params) => {
  const response = await axios.post(url, params)
  const {
    data: { access_token, refresh_token, scope, expires_in },
    data,
  } = response

  if (!data || !access_token || !refresh_token)
    throw new AppError('Authentication failed', 401)

  const userToken = response.data.access_token

  validateTwitchEnv()

  const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Client-Id': `${process.env.TWITCH_CLIENT_ID}`,
    },
  })

  if (!userResponse.data?.data?.[0]?.id)
    throw new AppError('User not found', 404)

  const userData = userResponse.data?.data?.[0]

  return { userData, access_token, refresh_token, scope, expires_in }
}
