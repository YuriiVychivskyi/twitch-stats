import express from 'express'

import { getPublicProfile } from '../controllers/streamerController.js'
import { asyncWrapper } from '../utils/asyncWrapper.js'

const router = express.Router()

router.get('/streamers/:streamerTwitchId', asyncWrapper(getPublicProfile))

export default router
