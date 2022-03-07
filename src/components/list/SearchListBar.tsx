import { BiSearch } from 'react-icons/bi'
import type { Category } from '@prisma/client'

type Props = {
  selected: Category
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const placeHolders: Record<Category, string> = {
  MOVIE: 'Search movie',
  TV: 'Search TV series',
  MUSIC: 'Search music',
  BOOK: 'Search book',
}

const SearchListBar = ({ selected, onChange }: Props) => {
  return (
    <div className='flex w-full items-center rounded-lg bg-gray-100 p-2 focus-within:outline focus-within:outline-pink-500'>
      <BiSearch size={24} className='text-gray-500' />
      <input
        type='text'
        className='ml-2 w-full bg-gray-100 focus:outline-none'
        placeholder={placeHolders[selected]}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchListBar
