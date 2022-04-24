import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import useDebounce from '@/hooks/useDebounce'
import useSearchUser from '@/hooks/useSearchUser'

const Search: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)

  const { data: userSearchResult, isFetching } =
    useSearchUser(debouncedSearchQuery)

  return (
    <div>
      <div className='bg-white shadow p-5 flex justify-center '>
        <div className='w-96 flex items-center rounded-lg bg-gray-100 p-1 focus-within:outline focus-within:outline-pink-500 '>
          <input
            placeholder='Search'
            className='ml-2 w-full bg-gray-100 outline-none'
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {isFetching && (
            <div className='animate-spin'>
              <AiOutlineLoading3Quarters size={20} />
            </div>
          )}
        </div>
      </div>

      <div className='mt-3'>
        {userSearchResult?.users.map((user) => (
          <div
            key={user.id}
            className='flex items-center space-x-5 bg-white p-3 rounded shadow justify-center'
          >
            <Image src={user.image!} alt='userImage' width={50} height={50} />
            <p className='font-semibold'> {user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
