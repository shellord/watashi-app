import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string(),
  username: z
    .string({})
    .min(4)
    .max(20)
    .regex(
      /^[a-zA-Z0-9]+$/,
      'Username should only contain letters and numbers'
    ),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  bio: z.string(),
  instagramUsername: z.string().nullable(),
  snapchatUsername: z.string().nullable(),
  twitterUsername: z.string().nullable(),
})
