import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const { username } = req.query

  switch (req.method) {
    case 'GET':
      try {
        const user = await prisma.user.findFirst({
          where: { username: username as string },
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
