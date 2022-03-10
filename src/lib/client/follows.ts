import axios from 'axios'
import { User } from '@/types/user'

type Follows = {
  followers: User[]
  following: User[]
}

export const followUser = async (id: string) => {
  await axios.post('/api/follows', {
    id,
  })
}

export const fetchFollows = async (id: string) => {
  const follows = await axios.get<Follows>(`/api/follows/${id}`)
  return follows.data
}

export const unfollowUser = async (id: string) => {
  await axios.delete(`/api/follows/${id}`)
}
