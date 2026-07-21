import {
  processStreamOfflineEvent,
  processStreamOnlineEvent,
} from '../services/eventSubService.js'

const handleEventSubNotification = async (req, res) => {
  const messageType = req.header('Twitch-Eventsub-Message-Type')

  if (messageType === 'webhook_callback_verification') {
    return res.status(200).send(req.body.challenge)
  }

  if (messageType === 'notification') {
    const subscriptionType = req.body.subscription.type

    if (subscriptionType === 'stream.online') {
      await processStreamOnlineEvent(req.body.event)
    }

    if (subscriptionType === 'stream.offline') {
      await processStreamOfflineEvent(req.body.event)
    }
  }

  res.sendStatus(200)
}

export { handleEventSubNotification }
