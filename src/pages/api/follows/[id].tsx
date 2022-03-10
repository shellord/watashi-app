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
    case 'GET': {
      const { id } = req.query as { id: string }
      try {
        const following = await prisma.user.findMany({
          where: {
            following: {
              some: {
                followerId: id,
              },
            },
          },
        })
        const followers = await prisma.user.findMany({
          where: {
            followers: {
              some: {
                followingId: id,
              },
            },
          },
        })
        return res
          .status(200)
          .json({ followers: followers, following: following })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    }

    case 'DELETE': {
      try {
        const { id } = req.query as { id: string }
        if (!id) {
          return res.status(400).json({
            message: 'id is required',
          })
        }

        await prisma.follows.delete({
          where: {
            followerId_followingId: {
              followerId: session.user.id!,
              followingId: id,
            },
          },
        })
        return res.status(200).json({ message: 'success' })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            return res.status(400).json({ error: 'user ID is invalid!' })
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
