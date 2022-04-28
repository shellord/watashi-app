import type { Category } from '@prisma/client'
import Image from 'next/image'

type Props = {
  title: string
  image: string | null
  category: Category
}

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const ListItemCard = ({ title, image, category }: Props) => {
  let imageUrl = ''
  if (category === 'MOVIE' || category === 'TV') {
    imageUrl = image ? `${IMAGE_URL}${image}` : '/images/150.png'
  } else {
    imageUrl = image!
  }

  return (
    <div className='relative w-32'>
      <div className='relative h-44 overflow-hidden rounded-lg shadow-sm'>
        <Image src={imageUrl} layout='fill' alt='poster' />
      </div>
      <p className='font-semibold'>{title}</p>
    </div>
  )
}

export default ListItemCard
