import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { getDetailsOfMovies, getDetails } from '@/lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  // if (!session) {
  //   return res.status(401).json({ error: 'Unauthorized' })
  // }
  switch (req.method) {
    case 'GET':
      return res.status(200).json({ message: 'hello' })

    case 'POST':
      const { category, items } = req.body
      if (!category) {
        return res.status(400).json({ error: 'Category should not be blank' })
      }
      if (category === 'MOVIE') {
        try {
          const results = await getDetailsOfMovies(
            process.env.TMDB_API_KEY!,
            items
          )

          res.status(200).json(results)
        } catch (error) {
          if (error instanceof Error)
            res.status(500).json({ error: error.message })
        }
      }
  }
}
