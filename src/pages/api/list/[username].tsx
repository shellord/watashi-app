import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = req.query as { username: string }
  try {
    const list = await prisma.user.findUnique({
      where: { username },
      select: {
        list: {
          select: {
            name: true,
            id: true,
            category: true,
            items: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    })
    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ error: 'Database Error' })
  }
}
