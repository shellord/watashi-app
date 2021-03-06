import type { Category, Item } from '@prisma/client'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import ListContainer from '@/components/list/ListContainer'

type Props = {
  name: string
  username: string
  listName: string
  listItems: Item[]
  userImage: string
  createdAt: Date
  isActorVerified: boolean
  category: Category
}

const Activity = ({
  name,
  username,
  listName,
  listItems,
  userImage,
  createdAt,
  isActorVerified,
  category,
}: Props) => {
  return (
    <div className='bg-primary p-3 rounded-lg shadow'>
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
            <a className='font-bold flex items-center'>
              {name}
              {isActorVerified && (
                <span className='ml-1'>
                  <GoVerified className='text-blue-500' />
                </span>
              )}
            </a>
          </Link>
          <p className='text-sm'>{moment(createdAt).fromNow()}</p>
        </div>
      </div>

      <div>
        <ListContainer
          listName={listName}
          listItems={listItems}
          category={category}
        />
      </div>
    </div>
  )
}

export default Activity
