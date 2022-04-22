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
        const activities = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
          select: {
            followers: {
              select: {
                following: {
                  select: {
                    activity: {
                      include: {
                        actor: true,
                        target: {
                          include: {
                            items: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })
        const activityFeeds = activities?.followers
          .map((following) => {
            return following.following.activity
          })
          .flat()
          .reverse()

        return res.status(200).json({ activityFeeds })
      } catch (error) {
        return res.status(500).json({ error: 'Database Error' })
      }
    }
    default:
      res.status(405).json({ error: 'Method Not Allowed' })
  }
}
