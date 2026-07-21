import {
  getTwitchAuthUrl,
  handleTwitchCallback,
} from '../services/authService.js'

const redirectToTwitchAuth = (req, res) => {
  const twitchAuthUrl = getTwitchAuthUrl()

  return res.redirect(twitchAuthUrl)
}
const handleTwitchAuthCallback = async (req, res) => {
  const code = req.query.code
  const user = await handleTwitchCallback(code)
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'
  const searchParams = new URLSearchParams({
    streamerTwitchId: user.twitchId,
  })

  return res.redirect(`${clientUrl}/dashboard?${searchParams.toString()}`)
}

export { handleTwitchAuthCallback, redirectToTwitchAuth }
