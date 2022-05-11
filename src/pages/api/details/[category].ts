import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import { getDetails as getBookDetails } from '@/lib/books'
import { connectSpotify } from '@/lib/spotify'
import { getDetails } from '@/lib/tmdb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { category, id } = req.query as { category: string; id: string }
  try {
    let details: any

    if (category === 'movie' || category === 'tv') {
      details = await getDetails(process.env.TMDB_API_KEY!, id, category)
    }
    if (category === 'book') {
      details = await getBookDetails(id, process.env.GOOGLE_API_KEY!)
    }
    if (category === 'music') {
      const spotify = await connectSpotify(
        process.env.SPOTIFY_CLIENT_ID!,
        process.env.SPOTIFY_CLIENT_SECRET!
      )
      details = await spotify.getDetails(id)
    }
    if (details) {
      return res.status(200).json(details)
    }
    return res.status(404).json({ error: 'Not found' })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong!' })
  }
}
