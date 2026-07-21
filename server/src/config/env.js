import { AppError } from '../utils/appError.js'

export const validateTwitchEnv = () => {
  if (
    !process.env.TWITCH_CLIENT_ID ||
    !process.env.TWITCH_CLIENT_SECRET ||
    !process.env.TWITCH_CALLBACK_URL
  ) {
    throw new AppError('Env params error', 500)
  }
}
