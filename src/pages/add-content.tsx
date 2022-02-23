import { NextPage } from 'next'
import ListButton from '@/components/ListButton'
import { MdOutlineMovie, MdMusicNote, MdTv } from 'react-icons/md'
import { BsBook } from 'react-icons/bs'
import { useRouter } from 'next/router'

const AddContent: NextPage = () => {
  return (
    <div className='bg-white p-2'>
      <p className='font-semibold'>Choose a list</p>
      <div className='my-3 grid grid-cols-2 gap-3 md:grid-cols-4'>
        <ListButton icon={MdOutlineMovie} label='Movie' />
        <ListButton icon={MdTv} label='TV Series' />
        <ListButton icon={MdMusicNote} label='Music' />
        <ListButton icon={BsBook} label='Book' />
      </div>
    </div>
  )
}

export default AddContent
