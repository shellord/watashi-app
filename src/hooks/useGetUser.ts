import { User } from '@prisma/client'
import { UseQueryOptions, useQuery } from 'react-query'

import { fetchUser } from '@/lib/client/user'

export const useGetUser = (
  username: string,
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['user', username], () => fetchUser(username), {
    ...options,
    enabled: !!username,
    retry: false,
  })
  return { user: query.data, status: query.status } as const
}
