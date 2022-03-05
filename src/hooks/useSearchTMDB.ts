import { useQuery } from 'react-query'
import { searchMovie } from '@/lib/client/search'

export default function useSearchTMDB(searchQuery: string) {
  return useQuery(['query', searchQuery], () => searchMovie(searchQuery), {
    enabled: !!searchQuery,
    initialData: [],
  })
}
