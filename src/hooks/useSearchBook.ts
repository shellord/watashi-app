import { useQuery } from 'react-query'

import { searchBook } from '@/lib/client/search'

export default function useSearchBook(searchQuery: string, enabled: boolean) {
  return useQuery(['book-query', searchQuery], () => searchBook(searchQuery), {
    enabled: enabled && !!searchQuery,
    initialData: [],
  })
}
