import { z } from 'zod'

const toDate = (val) => {
  if (!val) return val
  if (val?.toDate) return val.toDate()
  return val
}

const Stream = z.object({
  streamerTwitchId: z.string(),
  twitchStreamId: z.string(),
  startedAt: z.preprocess(toDate, z.date()).default(() => new Date()),
  endedAt: z.preprocess(toDate, z.date()).optional(),
  status: z.string(),
  totalMessages: z.number().default(0),
})

export default Stream
