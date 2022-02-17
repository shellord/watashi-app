import { useCurrentUser } from '@/hooks/useCurrentUser'
import Image from 'next/image'

const ProfilePage = () => {
  const [user, loading] = useCurrentUser()
  if (loading) {
    return null
  }

  return (
    <div className='shadow-s mt-2 rounded bg-white pb-2'>
      <div className='relative flex flex-col items-center'>
        <div className='flex h-28 w-full rounded-t bg-gray-400' />
        <div className='absolute top-[3.5rem]'>
          <Image
            src={user?.image as string}
            alt='avatar'
            width={100}
            height={100}
            className='rounded-full shadow'
          />
        </div>
        <div className='mt-10 flex flex-col items-center'>
          <span className='mt-2 text-lg font-bold'>{user?.name}</span>
          <span className='text-xs text-gray-500'>@{user?.username}</span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
