import { useQuery } from 'react-query'

import { searchMovie } from '@/lib/client/search'

export default function useSearchMovie(searchQuery: string, enabled: boolean) {
  return useQuery(
    ['movie-query', searchQuery],
    () => searchMovie(searchQuery),
    {
      enabled: enabled && !!searchQuery,
      initialData: [],
    }
  )
}
