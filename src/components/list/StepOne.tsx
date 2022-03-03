import { MdMusicNote, MdOutlineMovie, MdTv } from 'react-icons/md'
import { BsBook } from 'react-icons/bs'
import Link from 'next/link'

import CategoryButton from '@/components/list/CategoryButton'
import { Category } from '@/types/list'
import { BiArrowBack } from 'react-icons/bi'

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<Category>>
  setListName: React.Dispatch<React.SetStateAction<string>>
}

const StepOne = ({ setSelected, setListName }: Props) => {
  return (
    <>
      <div className='mb-3 flex '>
        <Link href='/my-list'>
          <a>
            <BiArrowBack size={22} />
          </a>
        </Link>
        <p className='flex w-full justify-center font-semibold'>
          Create a new list
        </p>
      </div>
      <label htmlFor='list-name'>
        <p>Enter the list name</p>
      </label>
      <input
        type='text'
        id='list-name'
        className='input-field w-full sm:w-1/2'
        placeholder='My Favourite List'
        defaultValue='My List'
        onChange={(event) => setListName(event.target.value)}
      />
      <div className='my-2 mt-3'>
        <label>
          <p>Select the list category</p>
        </label>
      </div>
      <div className='grid grid-cols-2 gap-1 md:grid-cols-4'>
        <CategoryButton
          icon={MdOutlineMovie}
          label='Movie'
          checked
          onClick={() => setSelected('movie')}
        />
        <CategoryButton
          icon={MdTv}
          label='TV'
          onClick={() => setSelected('tv')}
        />
        <CategoryButton
          icon={MdMusicNote}
          label='Music'
          onClick={() => setSelected('music')}
        />
        <CategoryButton
          icon={BsBook}
          label='Book'
          onClick={() => setSelected('book')}
        />
      </div>
    </>
  )
}

export default StepOne
