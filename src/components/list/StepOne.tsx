import { Category } from '@prisma/client'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { BsBook } from 'react-icons/bs'
import { MdMusicNote, MdOutlineMovie, MdTv } from 'react-icons/md'

import CategoryButton from '@/components/list/CategoryButton'

type Props = {
  setCategory: React.Dispatch<React.SetStateAction<Category>>
  setListName: React.Dispatch<React.SetStateAction<string>>
}

const StepOne = ({ setCategory, setListName }: Props) => {
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
        maxLength={40}
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
          onClick={() => setCategory('MOVIE')}
        />
        <CategoryButton
          icon={MdTv}
          label='TV'
          onClick={() => setCategory('TV')}
        />
        <CategoryButton
          icon={MdMusicNote}
          label='Music'
          onClick={() => setCategory('MUSIC')}
        />
        <CategoryButton
          icon={BsBook}
          label='Book'
          onClick={() => setCategory('BOOK')}
        />
      </div>
    </>
  )
}

export default StepOne
