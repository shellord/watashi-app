import { Comments } from '@prisma/client'
import axios, { AxiosError } from 'axios'

export const fetchUserComments = async (
  username: string
): Promise<Comments[] | null> => {
  const user = await axios.get(`/api/comments/${username}`)
  if (user.status === 200) {
    return user.data
  }
  return null
}
