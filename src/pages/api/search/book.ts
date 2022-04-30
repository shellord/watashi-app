import type { ListItem } from '@/types/list'
import { AxiosError } from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { searchBook } from '@/lib/books'

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
    const data = await searchBook(query, process.env.GOOGLE_BOOKS_API_KEY!)
    const list: ListItem[] = data.items.map((item: any) => ({
      id: item.id.toString(),
      title: item.volumeInfo.title,
      poster_path: item.volumeInfo.imageLinks.thumbnail,
    }))
    res.status(200).json(list)
  } catch (error) {
    const err = error as AxiosError
    res.status(500).json({ error: err.message })
  }
}
