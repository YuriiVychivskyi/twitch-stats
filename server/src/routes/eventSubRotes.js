import express from 'express'

import { handleEventSubNotification } from '../controllers/eventSubController.js'
import { asyncWrapper } from '../utils/asyncWrapper.js'

const router = express.Router()

router.post('/twitch/webhook', asyncWrapper(handleEventSubNotification))

export default router
