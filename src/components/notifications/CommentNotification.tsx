import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  name: string
  username: string
  image: string
  createdAt: Date
}

const CommentNotification = ({ name, username, image, createdAt }: Props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center  space-x-1'>
        <div className='relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0'>
          <Image src={image} alt='avatar' layout='fill' />
        </div>
        <div>
          <Link href={`/${username}`}>
            <a className='font-semibold'>{name}</a>
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
