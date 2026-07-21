import { createHmac, timingSafeEqual } from 'node:crypto'

import { AppError } from '../utils/appError.js'

export const verifyEventSubSignature = (req, _res, next) => {
  const twitchSignature = req.headers['twitch-eventsub-message-signature']
  const messageId = req.headers['twitch-eventsub-message-id']
  const timestamp = req.headers['twitch-eventsub-message-timestamp']

  if (
    !twitchSignature ||
    !messageId ||
    !timestamp ||
    !process.env.WEBHOOK_SECRET ||
    !req.rawBody
  )
    throw new AppError('Missing required headers or webhook secret', 403)

  const expectedSignature = createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(messageId)
    .update(timestamp)
    .update(req.rawBody)
    .digest('hex')

  const signature = `sha256=${expectedSignature}`
  const bufSignature = Buffer.from(signature)
  const bufTwitchSignature = Buffer.from(twitchSignature)

  if (bufSignature.length !== bufTwitchSignature.length)
    throw new AppError('Invalid signature length', 403)

  const isValid = timingSafeEqual(bufSignature, bufTwitchSignature)

  if (!isValid) throw new AppError('Invalid signature', 403)

  next()
}
