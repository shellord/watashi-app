import type { ListItem } from '@/types/list'
import { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { tmdbSearch } from '@/lib/tmdb'

const API_KEY = process.env.TMDB_API_KEY!

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const { query } = req.query as {
    query: string
  }

  if (!query) {
    return res.status(400).json({ error: 'No query' })
  }

  try {
    const tmdbResults = await tmdbSearch(API_KEY, query, false, 'tv')
    const list: ListItem[] = tmdbResults.results.map((item: any) => ({
      id: item.id.toString(),
      title: item.name,
      poster_path: item.poster_path,
    }))
    res.status(200).json(list)
  } catch (error) {
    const err = error as AxiosError
    res.status(500).json({ error: err.message })
  }
}
