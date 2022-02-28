import { NextPage } from 'next'
import ListButton from '@/components/ListButton'
import { MdOutlineMovie, MdMusicNote, MdTv } from 'react-icons/md'
import { BsBook } from 'react-icons/bs'
import { useState } from 'react'
import Head from 'next/head'

import SearchListBar from '@/components/SearchListBar'
import ListItemCard from '@/components/ListItemCard'
import useSearchTMDB from '@/hooks/useSearchTMDB'
import useDebounce from '@/hooks/useDebounce'
import type { List } from '@/types/list'

const AddList: NextPage = () => {
  const [selected, setSelected] = useState<List>('movie')
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)
  const { data } = useSearchTMDB(debouncedSearchQuery)

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Create a List</title>
      </Head>
      <div className='rounded bg-white p-2 shadow'>
        <div className='mt-3'>
          <label htmlFor='list-name'>
            <p>Enter the List Name</p>
          </label>
          <input
            type='text'
            id='list-name'
            className='input-field w-1/2'
            placeholder='List'
            defaultValue='My List'
          />
        </div>
        <div className='my-3 grid grid-cols-4 gap-1 md:grid-cols-4'>
          <ListButton
            icon={MdOutlineMovie}
            label='Movie'
            checked
            onClick={() => setSelected('movie')}
          />
          <ListButton
            icon={MdTv}
            label='TV'
            onClick={() => setSelected('tv')}
          />
          <ListButton
            icon={MdMusicNote}
            label='Music'
            onClick={() => setSelected('music')}
          />
          <ListButton
            icon={BsBook}
            label='Book'
            onClick={() => setSelected('book')}
          />
        </div>
        <div className='mt-2 border-b pb-2'>
          <SearchListBar selected={selected} onChange={onSearchChange} />
        </div>
        <div className='flex overflow-x-scroll'>
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <ListItemCard title={item.title} image={item.poster_path} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default AddList
