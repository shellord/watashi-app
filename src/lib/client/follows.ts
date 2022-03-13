import { User } from '@/types/user'
import axios, { AxiosError } from 'axios'

type Follows = {
  followers: User[]
  following: User[]
}

export const followUser = async (id: string) => {
  try {
    await axios.post('/api/follows', {
      id,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError
      if (serverError && serverError.response) {
        throw Error(serverError.response.data.error)
      }
    }
    throw Error('Something went wrong')
  }
}

export const fetchFollows = async (id: string) => {
  const follows = await axios.get<Follows>(`/api/follows/${id}`)
  return follows.data
}

export const unfollowUser = async (id: string) => {
  await axios.delete(`/api/follows/${id}`)
}
