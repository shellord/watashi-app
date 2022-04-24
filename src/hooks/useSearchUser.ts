import { useQuery } from 'react-query'

import { searchUser } from '@/lib/client/search'

export default function useSearchUser(searchQuery: string) {
  return useQuery(['user-query', searchQuery], () => searchUser(searchQuery), {
    enabled: !!searchQuery,
  })
}
