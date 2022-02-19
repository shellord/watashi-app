import { useQuery, UseQueryOptions } from 'react-query'
import { User } from '@/types/user'
import { fetchUser } from '@/lib/api/user'

export const useGetUser = (
  username: string,
  options?: UseQueryOptions<User | null, unknown, User | null, string[]>
) => {
  const query = useQuery(['user', username], () => fetchUser(username), {
    ...options,
    enabled: !!username,
  })
  return { user: query.data, status: query.status } as const
}
