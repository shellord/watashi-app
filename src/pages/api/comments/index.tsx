import { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  switch (req.method) {
    case 'GET': {
      try {
        const comments = await prisma.comment.findMany({
          where: {
            userId: session.user.id,
          },
        })
        return res.status(200).json(comments)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    case 'DELETE': {
      const { id } = req.query as { id: string }
      if (!id) {
        return res.status(400).json({ message: 'id is required' })
      }
      try {
        await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            myComments: {
              delete: {
                id,
              },
            },
          },
        })
        return res.status(200).json({ message: 'success' })
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
