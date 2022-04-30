import Link from 'next/link'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

import { useChangeListOrder } from '@/hooks/useChangeListOrder'
import { useCurrentUserList } from '@/hooks/useCurrentUserList'

import ListItemCard from '@/components/list/ListItemCard'
import SkeletonList from '@/components/skeletons/SkeletonList'

const EmptyList = () => (
  <div className='mt-3 flex h-52 items-center justify-center'>
    You don&apos;t have any list yet.
  </div>
)

const MyList = () => {
  const { data: lists, status } = useCurrentUserList()
  const { mutate: changeOrder } = useChangeListOrder()

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
      {lists && lists?.length === 0 && <EmptyList />}
      {status === 'loading' && (
        <div className='mt-4'>
          <SkeletonList />
        </div>
      )}
      {lists && (
        <div className='mt-3 space-y-3'>
          {lists.map((list) => (
            <div key={list.id} className='border-b pb-2 flex space-x-1'>
              <div className='mt-10 space-y-2 flex flex-col'>
                <button
                  disabled={list.order === 1}
                  onClick={() =>
                    changeOrder({
                      order: list.order - 1,
                      listId: list.id,
                    })
                  }
                >
                  <AiOutlineArrowUp
                    className={
                      list.order === 1 ? 'text-gray-500' : 'text-pink-500'
                    }
                    size={20}
                  />
                </button>
                <button
                  disabled={lists.length === list.order}
                  onClick={() =>
                    changeOrder({ order: list.order + 1, listId: list.id })
                  }
                >
                  <AiOutlineArrowDown
                    className={
                      lists.length === list.order
                        ? 'text-gray-500'
                        : 'text-pink-500'
                    }
                    size={20}
                  />
                </button>
              </div>

              <div className='w-full overflow-x-scroll'>
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
                    <div key={item.id}>
                      <ListItemCard
                        title={item.title}
                        image={item.posterPath}
                        category={list.category}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyList
