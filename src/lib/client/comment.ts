import { User } from '@prisma/client'
import axios from 'axios'

export type FetchUserCommentsResponse = {
  author: User
  text: string
  id: string
  createdAt: Date
}[]

export const fetchUserComments = async (
  username: string
): Promise<FetchUserCommentsResponse | null> => {
  const user = await axios.get(`/api/comments/${username}`)
  if (user.status === 200) {
    return user.data
  }
  return null
}

export const addComment = async ({
  username,
  text,
}: {
  username: string
  text: string
}) => {
  const response = await axios.post(`/api/comments/${username}`, { text })
  return response.data
}

export const deleteComment = async (id: string) => {
  const response = await axios.delete('api/comments/', { params: { id } })
  return response.data
}
