import React from 'react'
import Image from 'next/image'
import { User } from '@/types/user'

type Props = {
  user: User
  isSameUser: boolean
  onFollow: () => void
  onUnFollow: () => void
  isFollowing: boolean
}

const ProfileInfoSection = ({
  user,
  isSameUser,
  onFollow,
  onUnFollow,
  isFollowing,
}: Props) => {
  return (
    <div className='bg-white pb-2'>
      <div className='relative flex flex-col items-center'>
        <div className='flex h-28 w-full bg-gray-300' />
        <div className='absolute top-[3.5rem]'>
          {user.image && (
            <Image
              src={user?.image as string}
              alt='avatar'
              width={100}
              height={100}
              className='rounded-full shadow'
            />
          )}
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
        <div className='mt-3'>
          {!isSameUser && isFollowing && (
            <div className='group'>
              <button className='btn group-hover:hidden' onClick={onFollow}>
                Following
              </button>
              <button
                className='btn-secondary hidden group-hover:flex'
                onClick={onUnFollow}
              >
                Unfollow
              </button>
            </div>
          )}
          {!isSameUser && !isFollowing && (
            <div>
              <button className='btn' onClick={onFollow}>
                Follow
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoSection
