import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '@/types/user'
import { fetchUser } from '@/lib/api/user'

export const useCurrentUser = (
  username: string,
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['user', username], () => fetchUser(username), {
    ...options,
  })
  return [query.data, query.status === 'loading'] as const
}
