import { useQuery } from 'react-query'

import { searchMusic } from '@/lib/client/search'

export default function useSearchMusic(searchQuery: string, enabled: boolean) {
  return useQuery(
    ['music-query', searchQuery],
    () => searchMusic(searchQuery),
    {
      enabled: enabled && !!searchQuery,
      initialData: [],
    }
  )
}
