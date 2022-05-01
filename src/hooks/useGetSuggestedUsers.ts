import { User } from '@prisma/client'
import { UseQueryOptions, useQuery } from 'react-query'

import { fetchSuggestedUsers } from '@/lib/client/user'

const useGetSuggestedUsers = (
  options?: UseQueryOptions<User[] | null, unknown, User[] | null, string[]>
) => {
  return useQuery(['suggested-users'], () => fetchSuggestedUsers(), {
    ...options,
    refetchOnWindowFocus: false,
  })
}

export default useGetSuggestedUsers
