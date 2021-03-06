import { ListItem } from '@/types/list'
import { Category, Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getDetailsOfBooks } from '@/lib/books'
import { prisma } from '@/lib/prisma'
import { connectSpotify } from '@/lib/spotify'
import { getDetailsOfMovies, getDetailsOfTV } from '@/lib/tmdb'

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
          orderBy: {
            order: 'asc',
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

      try {
        let results: ListItem[] = []

        if (category === 'MOVIE') {
          results = await getDetailsOfMovies(process.env.TMDB_API_KEY!, items)
        }

        if (category === 'TV') {
          results = await getDetailsOfTV(process.env.TMDB_API_KEY!, items)
        }

        if (category === 'MUSIC') {
          const spotify = await connectSpotify(
            process.env.SPOTIFY_CLIENT_ID!,
            process.env.SPOTIFY_CLIENT_SECRET!
          )

          results = await spotify.getDetailsOfMusics(items)
        }

        if (category === 'BOOK') {
          results = await getDetailsOfBooks(
            items,
            process.env.GOOGLE_BOOKS_API_KEY!
          )
        }
        const listCount = await prisma.list.count({
          where: { ownerId: session.user.id },
        })
        const newList = await prisma.user.update({
          where: { id: session.user.id },
          data: {
            list: {
              create: {
                name,
                category,
                order: listCount + 1,
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
          select: {
            list: {
              take: 1,
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        })

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            activity: {
              create: {
                targetType: 'LIST',
                targetId: newList.list[0].id,
                verb: 'ADDED',
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

    case 'PUT': {
      const { name, items, category } = req.body as {
        name: string
        items: string[]
        category: Category
      }
      const { id: listId } = req.query as { id: string }

      try {
        let results: ListItem[] = []
        if (category === 'MOVIE') {
          results = await getDetailsOfMovies(process.env.TMDB_API_KEY!, items)
        }

        if (category === 'TV') {
          results = await getDetailsOfTV(process.env.TMDB_API_KEY!, items)
        }

        if (category === 'MUSIC') {
          const spotify = await connectSpotify(
            process.env.SPOTIFY_CLIENT_ID!,
            process.env.SPOTIFY_CLIENT_SECRET!
          )

          results = await spotify.getDetailsOfMusics(items)
        }

        if (category === 'BOOK') {
          results = await getDetailsOfBooks(
            items,
            process.env.GOOGLE_BOOKS_API_KEY!
          )
        }

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
                  id: listId,
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
        const listOrder = await prisma.list.findUnique({
          where: { id: id },
          select: { order: true },
        })

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            list: {
              delete: {
                id,
              },
              updateMany: {
                where: { order: { gt: listOrder?.order } },
                data: {
                  order: {
                    set: listOrder!.order - 1,
                  },
                },
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

    case 'PATCH': {
      const { id } = req.query as { id: string }
      const { order } = req.body as { order: number }

      const currentOrder = await prisma.list.findUnique({
        where: { id: id },
        select: { order: true },
      })

      if (currentOrder?.order === order) {
        return res.status(200).json({ message: 'Success' })
      }

      if (order < 1) {
        return res.status(400).json({ error: 'Order should be greater than 0' })
      }

      if (order > (await prisma.list.count())) {
        return res
          .status(400)
          .json({ error: 'Order should be less than total lists' })
      }

      try {
        if (order < currentOrder!.order) {
          console.log(order)
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              list: {
                updateMany: {
                  where: {
                    order: { gte: order, lt: currentOrder!.order },
                  },
                  data: {
                    order: {
                      increment: 1,
                    },
                  },
                },
              },
            },
          })

          await prisma.list.update({
            where: { id },
            data: {
              order,
            },
          })
        } else if (order > currentOrder!.order) {
          await prisma.user.update({
            where: { id: session.user.id },
            data: {
              list: {
                updateMany: {
                  where: { order: { gt: currentOrder!.order, lte: order } },
                  data: {
                    order: {
                      decrement: 1,
                    },
                  },
                },
              },
            },
          })
          await prisma.list.update({
            where: { id },
            data: {
              order,
            },
          })
        }
        return res.status(200).json({ message: 'Success' })
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Database Error' })
      }
    }
  }
}
