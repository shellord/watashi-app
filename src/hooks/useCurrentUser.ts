import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '@/types/user'
import { fetchUser } from '@/lib/api/user'

export default function useCurrentUser(
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) {
  const query = useQuery(['currentUser'], fetchUser, {
    ...options,
  })
  return [query.data, query.status === 'loading'] as const
}
