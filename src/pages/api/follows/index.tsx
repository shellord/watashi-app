import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Prisma } from '@prisma/client'
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
    case 'POST': {
      const { id } = req.body as { id: string }
      if (!id) {
        return res.status(400).json({
          message: 'id is required',
        })
      }
      try {
        await prisma.follows.create({
          data: {
            follower: {
              connect: {
                id: session.user.id,
              },
            },
            following: {
              connect: {
                id,
              },
            },
          },
        })

        return res.status(200).json({ message: 'success' })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            return res.status(400).json({ error: 'user ID is invalid!' })
          }
          if (error.code === 'P2002') {
            return res
              .status(400)
              .json({ error: 'Already Following this user!' })
          }
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    default: {
      return res.status(400).json({ error: 'Invalid Method' })
    }
  }
}