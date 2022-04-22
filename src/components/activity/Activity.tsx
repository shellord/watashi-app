import type { Item } from '@prisma/client'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'

import ListContainer from '@/components/list/ListContainer'

type Props = {
  name: string
  username: string
  listName: string
  listItems: Item[]
  userImage: string
  createdAt: Date
}

const Activity = ({
  name,
  username,
  listName,
  listItems,
  userImage,
  createdAt,
}: Props) => {
  return (
    <div className='bg-white p-2 rounded-lg shadow'>
      <div className='flex'>
        <Link href={`/${username}`}>
          <a>
            <Image
              src={userImage}
              alt={name}
              width={48}
              height={48}
              className='rounded-full'
            />
          </a>
        </Link>

        <div className='ml-3'>
          <Link href={`/${username}`}>
            <a className='font-bold'>{name}</a>
          </Link>
          <p className='text-sm'>{moment(createdAt).fromNow()}</p>
        </div>
      </div>

      <div>
        <ListContainer listName={listName} listItems={listItems} />
      </div>
    </div>
  )
}

export default Activity
