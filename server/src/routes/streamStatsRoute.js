import express from 'express'

import { getLiveStreamStats } from '../controllers/liveStreamStatsController.js'
import { asyncWrapper } from '../utils/asyncWrapper.js'

const router = express.Router()

router.get(
  '/streamers/:streamerTwitchId/live-stats',
  asyncWrapper(getLiveStreamStats),
)

export default router
