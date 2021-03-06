import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

type Props = {
  name: string
  username: string
  image: string
  createdAt: Date
  isActorVerified: boolean
}

const CommentNotification = ({
  name,
  username,
  image,
  createdAt,
  isActorVerified,
}: Props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center  space-x-1'>
        <Link href={`/${username}`}>
          <a className='relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 '>
            <Image src={image} alt='avatar' layout='fill' />
          </a>
        </Link>
        <div>
          <Link href={`/${username}`}>
            <a className='flex items-center font-semibold'>
              {name}
              {isActorVerified && (
                <span className='ml-1'>
                  <GoVerified className='text-blue-500' />
                </span>
              )}
            </a>
          </Link>
          <span className='ml-1'>Commented on your profile</span>
        </div>
      </div>
      <div>
        <p className='text-sm'>{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  )
}

export default CommentNotification
