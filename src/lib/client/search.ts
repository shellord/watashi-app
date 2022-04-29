import type { ListItem } from '@/types/list'
import { User } from '@prisma/client'
import axios from 'axios'

export type SearchUserResult = {
  users: User[]
}

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

export const searchMusic = async (query: string) => {
  const res = await axios.get<ListItem[]>('/api/search/music', {
    params: {
      query,
    },
  })
  return res.data
}

export const searchUser = async (query: string) => {
  const res = await axios.get<SearchUserResult>('/api/search/user', {
    params: {
      query,
    },
  })
  return res.data
}

export const searchBook = async (query: string) => {
  const res = await axios.get<ListItem[]>('/api/search/book', {
    params: {
      query,
    },
  })
  return res.data
}
