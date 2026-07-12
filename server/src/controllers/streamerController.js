import { getStreamerPublicProfile } from '../services/streamerService.js'
import { AppError } from '../utils/AppError.js'

const getPublicProfile = async (req, res) => {
  const { streamerTwitchId } = req.params
  if (!streamerTwitchId) throw new AppError('Streamer id is required', 400)
  const streamerPublicProfile = await getStreamerPublicProfile(streamerTwitchId)
  return res.status(200).json(streamerPublicProfile)
}

export { getPublicProfile }
