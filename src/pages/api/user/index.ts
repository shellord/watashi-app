import { Prisma, User } from '@prisma/client'
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
    case 'GET':
      try {
        const user = await prisma.user.findFirst({
          where: { id: session.user.id },
        })
        return res.status(200).json(user)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    case 'PUT':
      const {
        name,
        username,
        bio,
        gender,
        instagramUsername,
        snapchatUsername,
        twitterUsername,
      } = req.body as User

      if (!name || !username) {
        return res
          .status(400)
          .json({ error: 'Name and Username should not be blank' })
      }
      try {
        const updateUser = await prisma.user.update({
          where: { id: session.user.id },
          data: {
            name,
            username: username.toLowerCase(),
            bio,
            gender,
            instagramUsername,
            snapchatUsername,
            twitterUsername,
          },
        })
        return res.status(200).json(updateUser)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Username already taken!' })
          }
          return res.status(400).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Database Error' })
      }
    default:
      return res.status(405).json({ error: 'Method Not Allowed' })
  }
}
