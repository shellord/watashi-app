import { User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaInstagram, FaSnapchat, FaTwitter } from 'react-icons/fa'
import { GoVerified } from 'react-icons/go'

import FollowsModal from '@/components/profile/FollowsModal'

type Props = {
  user: User
  isSameUser: boolean
  onFollow: () => void
  onUnFollow: () => void
  isFollowing: boolean
  followers: User[]
  following: User[]
  isVerified: boolean
}

const ProfileInfoSection = ({
  user,
  isSameUser,
  onFollow,
  onUnFollow,
  isFollowing,
  followers,
  following,
  isVerified,
}: Props) => {
  const [showFollowerModal, setShowFollowerModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
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
          <div className='flex items-center mt-2'>
            <span className='text-lg font-bold'>{user?.name}</span>
            {isVerified && (
              <span className='flex items-center ml-1'>
                <GoVerified className='text-blue-500' />
              </span>
            )}
          </div>
          <span className='text-sm text-gray-500'>@{user?.username}</span>
          <span className='w-96 text-center text-sm'>{user?.bio}</span>
        </div>
        <div className='mt-2 flex space-x-4'>
          <button
            className='flex flex-col items-center'
            onClick={() => setShowFollowerModal(true)}
          >
            <span className='text-sm font-semibold'>{followers.length}</span>
            <span className='text-sm'>Followers</span>
          </button>
          <button
            className='flex flex-col items-center'
            onClick={() => setShowFollowingModal(true)}
          >
            <span className='text-sm font-semibold'>{following.length}</span>
            <span className='text-sm'>Following</span>
          </button>
        </div>
        <div className='mt-3 mb-2'>
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
            <div className='mb-2'>
              <button className='btn' onClick={onFollow}>
                Follow
              </button>
            </div>
          )}
        </div>

        <div className='flex space-x-3'>
          {user.instagramUsername && (
            <Link href={`https://www.instagram.com/${user.instagramUsername}`}>
              <a target='_blank'>
                <FaInstagram size={20} />
              </a>
            </Link>
          )}

          {user.twitterUsername && (
            <Link href={`https://twitter.com/${user.twitterUsername}`}>
              <a target='_blank'>
                <FaTwitter size={20} />
              </a>
            </Link>
          )}

          {user.snapchatUsername && (
            <Link
              href={`https://www.snapchat.com/add/${user.snapchatUsername}`}
            >
              <a target='_blank'>
                <FaSnapchat size={20} />
              </a>
            </Link>
          )}
        </div>
      </div>
      <FollowsModal
        showModal={showFollowerModal}
        setShowModal={setShowFollowerModal}
        users={followers}
        title='Followers'
      />
      <FollowsModal
        showModal={showFollowingModal}
        setShowModal={setShowFollowingModal}
        users={following}
        title='Following'
      />
    </div>
  )
}

export default ProfileInfoSection
