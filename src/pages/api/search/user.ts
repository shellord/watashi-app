import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query as {
    query: string
  }

  if (!query) {
    return res.status(400).json({ error: 'No query' })
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
          {
            username: {
              startsWith: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 20,
    })
    res.status(200).json({ users })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ error: err.message })
  }
}
