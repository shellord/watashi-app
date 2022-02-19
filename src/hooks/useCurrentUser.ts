import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '@/types/user'
import { fetchCurrentUser } from '@/lib/api/user'

export const useCurrentUser = (
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['currentUser'], fetchCurrentUser, {
    ...options,
    staleTime: Infinity,
  })
  return { user: query.data, status: query.status } as const
}
