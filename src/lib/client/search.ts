import axios from 'axios'
import type { Movie } from '@/types/tmdb'

export const searchMovie = async (query: string) => {
  const res = await axios.get<Movie[]>('/api/search/movie', {
    params: {
      query,
    },
  })
  return res.data
}
