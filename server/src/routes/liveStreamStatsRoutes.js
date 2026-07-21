import express from 'express'

import { getLiveStreamStats } from '../controllers/liveStreamStatsController.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()

router.get(
  '/streamers/:streamerTwitchId/live-stats',
  asyncHandler(getLiveStreamStats),
)

export default router
