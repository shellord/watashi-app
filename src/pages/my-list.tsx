import Link from 'next/link'

import { useCurrentUserList } from '@/hooks/useCurrentUserList'
import ListItemCard from '@/components/list/ListItemCard'

const EmptyList = () => (
  <div className='mt-3 flex h-52 items-center justify-center'>
    You don&apos;t have any list yet.
  </div>
)

const MyList = () => {
  const { data: lists } = useCurrentUserList()

  return (
    <div className='rounded bg-white p-2 shadow'>
      <div className='flex items-center justify-between border-b pb-2'>
        <p className='heading'>My Lists</p>
        <Link href='/create-list'>
          <a>
            <button className='btn'>Add New</button>
          </a>
        </Link>
      </div>
      {!lists && <EmptyList />}
      {lists && (
        <div className='mt-3 space-y-3'>
          {lists.map((list) => (
            <div key={list.id} className='border-b pb-2'>
              <div className='flex items-center justify-between'>
                <p className='text-xl font-bold'>{list.name}</p>
                <Link href={`edit-list/${list.id}`}>
                  <a>
                    <button className='btn-secondary'>Edit</button>
                  </a>
                </Link>
              </div>

              <div className='mt-2 flex space-x-3 overflow-x-scroll'>
                {list.items.map((item) => (
                  <div key={item.id} className=''>
                    <ListItemCard title={item.title} image={item.posterPath} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyList
