import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query as { username: string }

  switch (req.method) {
    case 'GET':
      try {
        const user = await prisma.user.findFirst({
          where: { username },
        })
        if (!user) {
          return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        res.status(500).json({ error: 'Database Error' })
      }

      break
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
  }
}
