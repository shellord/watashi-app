import { User } from '@prisma/client'
import axios, { AxiosError } from 'axios'

export type FetchUserCommentsResponse = {
  author: User
  text: string
  id: string
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
