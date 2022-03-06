import Link from 'next/link'
import { useCurrentUserList } from '@/hooks/useCurrentUserList'
import ListItemCard from '@/components/list/ListItemCard'

const EmptyList = () => (
  <div className='mt-3 flex h-52 items-center justify-center'>
    You don&apos;t have any list yet.
  </div>
)

const MyList = () => {
  const { data: lists, status } = useCurrentUserList()
  console.log(lists)

  return (
    <div className='rounded bg-white p-2 shadow'>
      <div className='flex items-center justify-between border-b pb-2'>
        <p className='heading'>My List</p>
        <Link href='/create-list'>
          <a>
            <button className='btn'>Add New</button>
          </a>
        </Link>
      </div>
      {!lists && <EmptyList />}
      {lists && (
        <div>
          {lists.map((list) => (
            <div key={list.id}>
              <div className='ml-3'>
                <p className='text-lg font-bold'>{list.name}</p>
              </div>
              <div className='flex'>
                {list.items.map((item) => (
                  <div key={item.id} className='p-3'>
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
