import express from 'express'

import { handleEventSubNotification } from '../controllers/eventSubController.js'
import { preventEventSubReplay } from '../middleware/preventEventSubReplay.js'
import { verifyEventSubSignature } from '../middleware/verifyEventSubSignature.js'
import { asyncWrapper } from '../utils/asyncWrapper.js'

const router = express.Router()

router.post(
  '/twitch/webhook',
  verifyEventSubSignature,
  preventEventSubReplay,
  asyncWrapper(handleEventSubNotification),
)

export default router
