import express from 'express'

import { getStreamerProfile } from '../controllers/streamerController.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()

router.get('/streamers/:streamerTwitchId', asyncHandler(getStreamerProfile))

export default router
