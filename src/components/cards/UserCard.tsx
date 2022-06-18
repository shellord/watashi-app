import Image from 'next/image'
import Link from 'next/link'

type Props = {
  id: string
  name: string
  username: string
  image: string
}
export const UserCard = ({ id, name, username, image }: Props) => {
  return (
    <div className='bg-primary shadow p-2 flex flex-col items-center'>
      <Link href={`/${username}`}>
        <a className='flex flex-col items-center'>
          <div className='relative w-16 h-16'>
            <Image
              src={image}
              layout='fill'
              alt='user-image'
              className='rounded-full'
            />
          </div>
          <div className='flex items-center flex-col'>
            <p className='font-semibold truncate'>{name}</p>
            <p className='text-sm text-gray-500'>@{username}</p>
          </div>
        </a>
      </Link>
    </div>
  )
}
