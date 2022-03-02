import Link from 'next/link'

const EmptyList = () => (
  <div className='mt-3 flex h-52 items-center justify-center'>
    You don&apos;t have any list yet.
  </div>
)

const MyList = () => {
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
      <EmptyList />
    </div>
  )
}

export default MyList
