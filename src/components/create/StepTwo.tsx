import ItemCard from '@/components/list/ItemCard'
import SearchListBar from '@/components/list/SearchListBar'
import useDebounce from '@/hooks/useDebounce'
import useSearchTMDB from '@/hooks/useSearchTMDB'
import { useState } from 'react'
import type { List } from '@/types/list'

type Props = {
  selected: List
}

const StepTwo = ({ selected }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSearchQuery = useDebounce(searchQuery, 600)

  const { data } = useSearchTMDB(debouncedSearchQuery)

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }
  return (
    <div className='rounded bg-white p-2 shadow'>
      <div className='mt-2 border-b pb-2'>
        <SearchListBar selected={selected} onChange={onSearchChange} />
      </div>

      <div className='flex overflow-x-auto'>
        {data &&
          data.map((item) => (
            <div key={item.id}>
              <ItemCard title={item.title} image={item.poster_path} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default StepTwo
