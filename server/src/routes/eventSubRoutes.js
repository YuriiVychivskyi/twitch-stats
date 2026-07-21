import express from 'express'

import { handleEventSubNotification } from '../controllers/eventSubController.js'
import { preventEventSubReplay } from '../middleware/preventEventSubReplay.js'
import { verifyEventSubSignature } from '../middleware/verifyEventSubSignature.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()

router.post(
  '/twitch/webhook',
  verifyEventSubSignature,
  preventEventSubReplay,
  asyncHandler(handleEventSubNotification),
)

export default router
