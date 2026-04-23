import express from 'express'

import {
  redirectToTwitchAuth,
  twitchAuthCallback,
} from '../controllers/authController.js'
import { asyncWrapper } from '../utils/asyncWrapper.js'

const router = express.Router()

router.get('/auth/twitch', asyncWrapper(redirectToTwitchAuth))
router.get('/auth/callback', asyncWrapper(twitchAuthCallback))

export default router
