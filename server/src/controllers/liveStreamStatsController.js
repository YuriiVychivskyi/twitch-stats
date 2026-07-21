import { getActiveStreamStats } from '../services/liveStreamStateService.js'
import { AppError } from '../utils/appError.js'

const getLiveStreamStats = async (req, res) => {
  const { streamerTwitchId } = req.params
  if (!streamerTwitchId) throw new AppError('Twitch id not found!', 400)

  const stats = await getActiveStreamStats(streamerTwitchId)
  if (stats === null) return res.status(200).json(null)

  return res.status(200).json(stats)
}

export { getLiveStreamStats }
