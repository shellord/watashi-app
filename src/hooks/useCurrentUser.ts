import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '@/types/user'
import { fetchCurrentUser } from '@/lib/api/user'

export const useCurrentUser = (
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['currentUser'], fetchCurrentUser, {
    ...options,
  })
  return [query.data, query.status === 'loading'] as const
}
