import { AxiosError } from 'axios'
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

  try {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: session.user.id,
            },
          },
          {
            following: {
              every: {
                followerId: {
                  not: session.user.id,
                },
              },
            },
          },
        ],
      },
    })
    const randomUsers = users.sort(() => 0.5 - Math.random())
    const suggestedUsers = randomUsers.slice(0, 20)

    return res.status(200).json(suggestedUsers)
  } catch (error) {
    const err = error as AxiosError
    res.status(500).json({ error: err.message })
  }
}
