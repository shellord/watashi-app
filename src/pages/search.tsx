import { NextPage } from 'next'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import useDebounce from '@/hooks/useDebounce'
import useSearchUser from '@/hooks/useSearchUser'

const Search: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)

  const { data: users, isFetching } = useSearchUser(debouncedSearchQuery)

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
    </div>
  )
}

export default Search
