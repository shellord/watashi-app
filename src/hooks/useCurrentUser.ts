import { User } from '@prisma/client'
import { UseQueryOptions, useQuery } from 'react-query'

import { fetchCurrentUser } from '@/lib/client/user'

export const useCurrentUser = (
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['currentUser'], fetchCurrentUser, {
    ...options,
    staleTime: Infinity,
  })
  return { user: query.data, status: query.status } as const
}
