import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { username } = req.query as { username: string }
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
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
        },
      },
    })
    return res.status(200).json(list)
  } catch (error) {
    return res.status(500).json({ error: 'Database Error' })
  }
}
