import { Category } from '@prisma/client'
import { useQuery } from 'react-query'

import { fetchItemDetails } from '@/lib/client/list'

const useGetItemDetails = (category: Category, itemId: string) => {
  return useQuery(['item', { category, itemId }], async () => {
    return fetchItemDetails(category, itemId)
  })
}

export default useGetItemDetails
