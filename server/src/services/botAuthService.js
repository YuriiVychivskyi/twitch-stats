import axios from 'axios'

const refreshBotAccessToken = async () => {
  const params = new URLSearchParams({
    client_id: process.env.TWITCH_BOT_CLIENT_ID,
    client_secret: process.env.TWITCH_BOT_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: process.env.TWITCH_BOT_REFRESH_TOKEN,
  })

  const response = await axios.post('https://id.twitch.tv/oauth2/token', params)

  return response.data
}

export { refreshBotAccessToken }
