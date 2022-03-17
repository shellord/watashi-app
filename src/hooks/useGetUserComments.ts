import { useQuery } from 'react-query'

import { fetchUserComments } from '@/lib/client/comment'

export const useGetUserComments = (username: string) => {
  return useQuery(['comments', username], () => fetchUserComments(username))
}
