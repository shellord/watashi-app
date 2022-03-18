import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

import { useCurrentUser } from '@/hooks/useCurrentUser'

import CommentMenu from '@/components/Comments/CommentMenu'

type Props = {
  id: string
  text: string
  authorImageUrl: string
  authorUsername: string
  authorName: string
  createdAt: Date
}
const CommentItem = ({
  id,
  text,
  authorImageUrl,
  authorUsername,
  authorName,
  createdAt,
}: Props) => {
  const { user: currentUser } = useCurrentUser()
  const isSameUser = currentUser?.username === authorUsername
  return (
    <div className='flex items-center'>
      <Link href={`/${authorUsername}`}>
        <a className='w-[2.4rem] h-[2.4rem] relative  '>
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
            <p className='font-semibold'>{authorName}</p>
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
