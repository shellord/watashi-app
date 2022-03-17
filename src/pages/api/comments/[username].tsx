import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET': {
      const { username } = req.query as { username: string }
      if (!username) {
        return res.status(400).json({
          message: 'username is required',
        })
      }
      try {
        const data = await prisma.user.findUnique({
          where: {
            username,
          },
          select: {
            comments: {
              select: {
                text: true,
                id: true,
                author: true,
              },
            },
          },
        })
        return res.status(200).json(data?.comments)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    default: {
      return res.status(400).json({ error: 'Invalid Method' })
    }
  }
}
