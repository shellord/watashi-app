import Image from 'next/image'

type Props = {
  name: string
  username: string
  image: string
}
export const UserCard = ({ name, username, image }: Props) => {
  return (
    <div className='bg-white shadow p-2 flex flex-col items-center'>
      <div className='relative w-16 h-16'>
        <Image
          src={image}
          layout='fill'
          alt='user-image'
          className='rounded-full'
        />
      </div>
      <div className='flex items-center flex-col'>
        <p className='font-semibold '>{name}</p>
        <p className='text-sm text-gray-500'>@{username}</p>
      </div>
      <div className='mt-3'>
        <button className='btn'>Follow</button>
      </div>
    </div>
  )
}
