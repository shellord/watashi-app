import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  name: string
  username: string
  image: string
  createdAt: Date
}

const FollowNotification = ({ name, username, image, createdAt }: Props) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center  space-x-1'>
        <div className='relative w-5 h-5 rounded-full overflow-hidden'>
          <Image src={image} alt='avatar' layout='fill' />
        </div>
        <div>
          <p>
            <Link href={`/${username}`}>
              <a className='font-semibold'>{name}</a>
            </Link>{' '}
            followed you
          </p>
        </div>
      </div>
      <div>
        <p className='text-sm'>{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  )
}

export default FollowNotification
