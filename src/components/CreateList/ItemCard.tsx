import Image from 'next/image'

type Props = {
  title: string
  image: string
}

const IMAGE_URL = `https://image.tmdb.org/t/p/w500/`

const ListItemCard = ({ title, image }: Props) => {
  const imageUrl = image ? `${IMAGE_URL}${image}` : '/images/150.png'

  return (
    <div className='m-3 w-32'>
      <div className='relative h-44 overflow-hidden rounded-lg shadow-sm'>
        <Image src={imageUrl} layout='fill' alt='poster' />
      </div>
      <p className='font-semibold'>{title}</p>
    </div>
  )
}

export default ListItemCard
