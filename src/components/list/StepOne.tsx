import { MdMusicNote, MdOutlineMovie, MdTv } from 'react-icons/md'
import { BsBook } from 'react-icons/bs'

import CategoryButton from '@/components/list/CategoryButton'
import { List } from '@/types/list'

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<List>>
}

const StepOne = ({ setSelected }: Props) => {
  return (
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
    </div>
  )
}

export default StepOne
