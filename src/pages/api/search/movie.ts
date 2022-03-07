import type { NextApiRequest, NextApiResponse } from 'next'
import { tmdb } from '@/lib/tmdb'
import { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'
import type { ListItem } from '@/types/list'

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

  try {
    const tmdbResults = await tmdb(API_KEY, query, false, 'movie')
    const list: ListItem[] = tmdbResults.results.map((item: any) => ({
      id: item.id.toString(),
      title: item.title,
      poster_path: item.poster_path,
    }))
    res.status(200).json(list)
  } catch (error) {
    const err = error as AxiosError
    res.status(500).json({ error: err.message })
  }
}
