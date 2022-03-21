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
        const data = await prisma.user.findFirst({
          where: {
            id: session.user.id,
          },

          include: {
            notifications: {
              include: {
                actor: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        })

        return res.status(200).json({ notifications: data?.notifications })
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    case 'PATCH': {
      try {
        const data = await prisma.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            notifications: {
              updateMany: {
                data: {
                  seen: true,
                },
                where: {
                  seen: false,
                },
              },
            },
          },
        })
        return res.status(200).json({ notifications: data })
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
