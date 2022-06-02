import MovieDetails from './MovieDetails'
import TVDetails from './TVDetails'
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

  let trailerLink = null
  if (category === 'MOVIE' || category === 'MUSIC') {
    trailerLink = data.videos.results[0]
      ? `https://youtube.com/watch?v=${data.videos.results[0].key}`
      : null
  }

  return (
    <div>
      {category === 'MUSIC' && <p>Details Not available yet</p>}
      {category === 'BOOK' && <p>Details Not available yet</p>}

      {category === 'MOVIE' && (
        <MovieDetails
          name={data.title}
          description={data.overview}
          image={data.poster_path}
          rating={data.vote_average}
          genres={data.genres}
          releaseDate={data.release_date}
          trailerLink={trailerLink}
        />
      )}

      {category === 'TV' && (
        <TVDetails
          name={data.name}
          description={data.overview}
          image={data.poster_path}
          rating={data.vote_average}
          genres={data.genres}
          releaseDate={data.first_air_date}
          trailerLink={trailerLink}
        />
      )}
    </div>
  )
}

export default ItemDetails
