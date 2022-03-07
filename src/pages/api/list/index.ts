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

  switch (req.method) {
    case 'GET': {
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
    }

    case 'POST': {
      const { name, category, items } = req.body as {
        name: string
        category: Category
        items: string[]
      }

      if (!category) {
        return res.status(400).json({ error: 'Category should not be blank' })
      }
      if (category === 'MOVIE') {
        try {
          const results = await getDetailsOfMovies(
            process.env.TMDB_API_KEY!,
            items
          )

          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              list: {
                create: {
                  name,
                  category,
                  items: {
                    create: results.map((item) => ({
                      itemId: item.id,
                      title: item.title,
                      posterPath: item.poster_path,
                    })),
                  },
                },
              },
            },
          })

          return res.status(200).json(results)
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message })
          }
          return res.status(500).json({ error: 'Database Error' })
        }
      }
    }

    case 'PUT': {
      const { name, items } = req.body as {
        name: string
        items: string[]
      }
      try {
        const results = await getDetailsOfMovies(
          process.env.TMDB_API_KEY!,
          items
        )

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            list: {
              update: {
                data: {
                  name: name,
                  items: {
                    deleteMany: {},
                    create: results.map((item) => ({
                      itemId: item.id,
                      title: item.title,
                      posterPath: item.poster_path,
                    })),
                  },
                },
                where: {
                  id: req.query.id as string,
                },
              },
            },
          },
        })

        return res.status(200).json({ message: 'Success' })
      } catch (error) {
        return res.status(500).json({ error: 'Database Error' })
      }
    }

    case 'DELETE': {
      const { id } = req.query as { id: string }
      try {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            list: {
              delete: {
                id,
              },
            },
          },
        })
        return res.status(200).json({ message: 'Success' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Database Error' })
      }
    }
  }
}
