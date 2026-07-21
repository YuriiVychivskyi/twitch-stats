import express from 'express'

import {
  handleTwitchAuthCallback,
  redirectToTwitchAuth,
} from '../controllers/authController.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = express.Router()

router.get('/auth/twitch', asyncHandler(redirectToTwitchAuth))
router.get('/auth/callback', asyncHandler(handleTwitchAuthCallback))

export default router
