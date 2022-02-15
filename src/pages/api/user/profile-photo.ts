import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { prisma } from '@/lib/prisma'
import { generateAvatar } from '@/lib/avatar'

const API_ENDPOINT = 'https://api.cloudinary.com/v1_1/watashi-app/upload'
const UPLOAD_PRESET = 'gzshbsoo'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  switch (req.method) {
    case 'PUT':
      const { dataUri } = req.body
      try {
        const response = await axios.post(API_ENDPOINT, {
          file: dataUri,
          upload_preset: UPLOAD_PRESET,
        })
        const user = await prisma.user.update({
          where: { id: session.user.id },
          data: {
            image: response.data.secure_url,
          },
        })
        res.status(200).json(user)
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
      }
      break

    default:
      res.status(400).json({ error: 'Bad Method' })
  }
}
