import 'dotenv/config'
import tmi from 'tmi.js'

import { AppError } from '../utils/AppError.js'
import { trackStreamMessage } from './liveStreamStateService.js'

let client = null

const connectBot = async () => {
  if (client) return

  client = new tmi.Client({
    options: { debug: true },
    identity: {
      username: process.env.TWITCH_BOT_USERNAME,
      password: `oauth:${process.env.TWITCH_BOT_ACCESS_TOKEN}`,
    },
    channels: [],
  })

  client.on('message', async (channel, tags, message, self) => {
    if (
      self ||
      !message.trim() ||
      !tags['room-id'] ||
      !tags['user-id'] ||
      !tags['display-name'] ||
      !tags.username
    )
      return

    const chatterMeta = {
      chatterDisplayName: tags['display-name'],
      chatterUsername: tags.username,
    }

    try {
      await trackStreamMessage(tags['room-id'], tags['user-id'], chatterMeta)
    } catch (error) {
      console.error('Failed to increment stream messages', error)
    }
  })

  await client.connect()

  console.log('Bot connected!')
}

const joinChannel = async (login) => {
  if (!client) throw new AppError('Bot client is not connected', 503)
  if (!login) throw new AppError('Channel login is required', 400)

  await client.join(login)
}

const partChannel = async (login) => {
  if (!client) throw new AppError('Bot client is not connected', 503)
  if (!login) throw new AppError('Channel login is required', 400)

  await client.part(login)
}

export { connectBot, joinChannel, partChannel }
