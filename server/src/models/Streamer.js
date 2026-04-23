import * as z from 'zod'

const Streamer = z.object({
  twitchId: z.string(),
  login: z.string(),
  displayName: z.string(),
  email: z.string().optional(),
  accessToken: z.string().min(10),
  refreshToken: z.string().min(10),
  scope: z.array(z.string()),
  expireIn: z.number().positive(),
  updatedAt: z.date().default(() => new Date()),
  profileImageUrl: z.string().optional(),
})

export default Streamer
