import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

import { getDetailsOfMovies } from '@/lib/tmdb'
import { Prisma, Category } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { name, category, items } = req.body as {
    name: string
    category: Category
    items: string[]
  }

  switch (req.method) {
    case 'GET':
      try {
        const list = await prisma.list.findMany({
          where: { ownerId: session.user.id },
          include: {
            items: true,
          },
        })
        return res.status(200).json(list)
      } catch (error) {
        return res.status(500).json({ error: 'Database Error' })
      }

    case 'POST':
      if (!category) {
        return res.status(400).json({ error: 'Category should not be blank' })
      }
      if (category === 'MOVIE') {
        try {
          const results = await getDetailsOfMovies(
            process.env.TMDB_API_KEY!,
            items
          )
          await prisma.list.create({
            data: {
              name,
              category,
              items: {
                create: results.map((item) => ({
                  itemId: item.id,
                  title: item.title,
                  posterPath: item.poster_path,
                })),
              },
              owner: {
                connect: {
                  id: session?.user.id,
                },
              },
            },
          })

          res.status(200).json(results)
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message })
          }
          return res.status(500).json({ error: 'Database Error' })
        }
      }
    case 'PUT':
      try {
        const results = await getDetailsOfMovies(
          process.env.TMDB_API_KEY!,
          items
        )
        await prisma.list.update({
          where: {
            id: req.query.id as string,
          },
          data: {
            name,
            items: {
              deleteMany: {},
              create: results.map((item) => ({
                itemId: item.id,
                title: item.title,
                posterPath: item.poster_path,
              })),
            },
          },
        })
        res.status(200).json({ message: 'Success' })
      } catch (error) {
        return res.status(500).json({ error: 'Database Error' })
      }
  }
}
