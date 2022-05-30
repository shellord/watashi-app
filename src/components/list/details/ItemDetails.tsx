import MovieDetails from './MovieDetails'
import { Category } from '@prisma/client'

import useGetItemDetails from '@/hooks/useGetItemDetails'

type Props = {
  category: Category
  itemId: string
}

const ItemDetails = ({ category, itemId }: Props) => {
  const { data, isLoading } = useGetItemDetails(category, itemId)

  return (
    <div>
      <h1>Item Details</h1>
    </div>
  )
}

export default ItemDetails
