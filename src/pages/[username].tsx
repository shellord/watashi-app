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
        <div className='flex h-28 w-full rounded-t bg-gray-300' />
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
          <span className='w-96 text-center text-sm'>{user?.bio}</span>
        </div>
        <div className='mt-2 flex space-x-4'>
          <div className='flex flex-col text-center'>
            <span className='text-sm font-semibold'>0</span>
            <span className='text-sm'>Followers</span>
          </div>
          <div className='flex flex-col text-center'>
            <span className='text-sm font-semibold'>0</span>
            <span className='text-sm'>Following</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
