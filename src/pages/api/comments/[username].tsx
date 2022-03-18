import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { username } = req.query as { username: string }

  switch (req.method) {
    case 'GET': {
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
                createdAt: true,
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
    case 'POST': {
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      const { text } = req.body as { text: string }
      if (!text) {
        return res.status(400).json({ message: 'text is required' })
      }

      if (!username) {
        return res.status(400).json({
          message: 'username is required',
        })
      }
      try {
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        })
        if (!user) {
          return res.status(400).json({
            message: 'user not found',
          })
        }
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            myComments: {
              create: {
                text,
                userId: user.id,
              },
            },
          },
        })
        return res.status(200).json({ message: 'success' })
      } catch (error) {
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    default: {
      return res.status(400).json({ error: 'Invalid Method' })
    }
  }
}
