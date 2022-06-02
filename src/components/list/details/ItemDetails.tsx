import MovieDetails from './MovieDetails'
import { Category } from '@prisma/client'

import useGetItemDetails from '@/hooks/useGetItemDetails'

type Props = {
  category: Category
  itemId: string
}

const ItemDetails = ({ category, itemId }: Props) => {
  const { data, isLoading } = useGetItemDetails(category, itemId)

  if (isLoading) {
    return <div>Loading...</div>
  }
  const trailerkey = data.videos.results[0].key ?? null
  return (
    <div>
      {category === 'MOVIE' && (
        <MovieDetails
          name={data.original_title}
          description={data.overview}
          image={data.poster_path}
          rating={data.vote_average}
          genres={data.genres}
          releaseDate={data.release_date}
          trailerLink={`https://youtube.com/watch?v=${data.videos.results[0].key}`}
        />
      )}
    </div>
  )
}

export default ItemDetails
