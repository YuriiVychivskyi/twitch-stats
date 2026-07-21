import * as z from 'zod'

const StreamerSchema = z.object({
  twitchId: z.string(),
  login: z.string(),
  displayName: z.string(),
  email: z.string().optional(),
  accessToken: z.string().min(10),
  refreshToken: z.string().min(10),
  scope: z.array(z.string()),
  expiresIn: z.number().positive(),
  updatedAt: z.date().default(() => new Date()),
  profileImageUrl: z.string().optional(),
})

export default StreamerSchema
