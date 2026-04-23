import {
  getTwitchAuthUrl,
  handleTwitchCallback,
} from '../services/authService.js'

const redirectToTwitchAuth = (req, res, next) => {
  const twitchAuthUrl = getTwitchAuthUrl()

  return res.redirect(twitchAuthUrl)
}
const twitchAuthCallback = async (req, res, next) => {
  const code = req.query.code
  const user = await handleTwitchCallback(code)
  return res.json(user)
}

export { redirectToTwitchAuth, twitchAuthCallback }
