import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import CommentMenu from '@/components/comment/CommentMenu'

type Props = {
  id: string
  text: string
  authorImageUrl: string
  authorUsername: string
  authorName: string
  createdAt: Date
  isAuthorVerified: boolean
}
const CommentItem = ({
  id,
  text,
  authorImageUrl,
  authorUsername,
  authorName,
  createdAt,
  isAuthorVerified,
}: Props) => {
  const { user: currentUser } = useCurrentUser()
  const isSameUser = currentUser?.username === authorUsername
  return (
    <div className='flex items-center'>
      <Link href={`/${authorUsername}`}>
        <a className='w-[2.4rem] h-[2.4rem] relative flex-shrink-0'>
          <Image
            src={authorImageUrl}
            alt='author'
            className='rounded-full'
            layout='fill'
          />
        </a>
      </Link>

      <div className='ml-2 flex flex-col w-full'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='flex items-center'>
              <Link href={`/${authorUsername}`}>
                <a className='font-semibold'>{authorName}</a>
              </Link>
              {isAuthorVerified && (
                <span className='ml-1'>
                  <GoVerified className='text-blue-500' />
                </span>
              )}
            </div>
            <div className='ml-2'>
              <p className='text-xs text-gray-600'>
                {moment(createdAt).fromNow()}
              </p>
            </div>
          </div>
          <CommentMenu id={id} isSameUser={isSameUser} />
        </div>

        <div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
