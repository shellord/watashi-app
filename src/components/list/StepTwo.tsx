import type { ListItem } from '@/types/list'
import type { Category } from '@prisma/client'
import { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

import useDebounce from '@/hooks/useDebounce'
import useSearchMovie from '@/hooks/useSearchMovie'
import useSearchTV from '@/hooks/useSearchTV'

import DeleteIcon from '@/components/list/DeleteIcon'
import ListItemCard from '@/components/list/ListItemCard'
import PlusIcon from '@/components/list/PlusIcon'
import SearchListBar from '@/components/list/SearchListBar'

type Props = {
  selected: Category
  list: ListItem[]
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const StepTwo = ({ selected, setStep, list, setList }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)

  const { data: movieResults } = useSearchMovie(
    debouncedSearchQuery,
    selected === 'MOVIE'
  )
  const { data: tvResults } = useSearchTV(
    debouncedSearchQuery,
    selected === 'TV'
  )

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const addToList = (item: ListItem) => {
    if (list.includes(item)) return
    setList([...list, item])
  }
  const removeFromList = (item: ListItem) => {
    setList(list.filter((i) => i.id !== item.id))
  }

  const data = selected === 'MOVIE' ? movieResults : tvResults
  return (
    <>
      <button onClick={() => setStep(1)}>
        <BiArrowBack size={22} />
      </button>

      {list.length === 0 && (
        <div className='flex h-44 items-center justify-center'>
          <p className=''>Search and add to list!</p>
        </div>
      )}

      {list.length > 0 && (
        <div className='mt-3 flex items-start space-x-3 overflow-x-auto'>
          {list.map((item) => (
            <button
              key={item.id}
              className='relative'
              onClick={() => removeFromList(item)}
            >
              <div className='absolute z-10 flex w-full justify-end'>
                <DeleteIcon />
              </div>
              <div>
                <ListItemCard title={item.title} image={item.poster_path} />
              </div>
            </button>
          ))}
        </div>
      )}

      <div className='mt-2 pb-2'>
        <SearchListBar selected={selected} onChange={onSearchChange} />
      </div>

      <div className='mt-3 flex items-start space-x-3 overflow-x-auto'>
        {data &&
          data.map((item) => (
            <button
              onClick={() => addToList(item)}
              key={item.id}
              className='relative'
            >
              <div className='absolute z-10 flex w-full justify-end '>
                <PlusIcon />
              </div>
              <div>
                <ListItemCard title={item.title} image={item.poster_path} />
              </div>
            </button>
          ))}
      </div>
    </>
  )
}

export default StepTwo
