import type { ListItem } from '@/types/list'
import axios from 'axios'

export const searchMovie = async (query: string) => {
  const res = await axios.get<ListItem[]>('/api/search/movie', {
    params: {
      query,
    },
  })
  return res.data
}

export const searchTV = async (query: string) => {
  const res = await axios.get<ListItem[]>('/api/search/tv', {
    params: {
      query,
    },
  })
  return res.data
}
