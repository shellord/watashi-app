import { useQuery } from 'react-query'
import { searchTV } from '@/lib/client/search'

export default function useSearchTV(searchQuery: string, enabled: boolean) {
  return useQuery(['tv-query', searchQuery], () => searchTV(searchQuery), {
    enabled: enabled && !!searchQuery,
    initialData: [],
  })
}
