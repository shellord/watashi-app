import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { FaYoutube } from 'react-icons/fa'
import { HiStar } from 'react-icons/hi'

type Props = {
  name: string
  description: string
  image: string
  rating: number
  genres: {
    id: number
    name: string
  }[]
  releaseDate: Date
  trailerLink: string | null
}

const IMAGE_URL = `https://image.tmdb.org/t/p/w500`

const GenreBadge = ({ genre }: { genre: string }) => {
  return (
    <div className='bg-secondary p-1 rounded text-sm  text-center flex items-center truncate'>
      {genre}
    </div>
  )
}

const TVDetails = ({
  name,
  description,
  image,
  rating,
  genres,
  releaseDate,
  trailerLink,
}: Props) => {
  const imageUrl = image ? `${IMAGE_URL}${image}` : '/images/150.png'

  return (
    <div className='mt-10 mx-5 pb-2'>
      <div className='flex flex-col sm:flex-row items-center'>
        <div className='relative h-44 w-32 flex-shrink-0'>
          <Image src={imageUrl} alt={name} layout='fill' />
        </div>
        <div className='ml-5 relative'>
          <p className='font-bold text-xl text-center sm:text-left'>{name}</p>
          <div className='flex space-x-1 flex-col items-center sm:items-start'>
            <span className='text-xl font-semibold flex items-sa'>
              <HiStar className='text-yellow-500' size={20} />
              {rating}
              <span className='text-gray-500 text-base'>/10</span>
            </span>
            <div className='flex w-full'>
              <div className='flex space-x-2 flex-wrap justify-center'>
                {genres.map((genre) => {
                  return <GenreBadge genre={genre.name} key={genre.id} />
                })}
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm'>{description}</p>
          </div>
          <div className='flex justify-between items-center mt-2'>
            <div className='flex space-x-1 mt-1'>
              <p className='italic'>Released on : </p>
              <span>{moment(releaseDate).format('YYYY')}</span>
            </div>
            {trailerLink && (
              <Link href={trailerLink}>
                <a
                  className='bg-red-600 p-1 flex items-center space-x-2 w-fit'
                  target='_blank'
                >
                  <FaYoutube size={22} />
                  <span> Watch Trailer</span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TVDetails
