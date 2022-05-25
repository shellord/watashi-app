import type { Category } from '@prisma/client'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

type Props = {
  selected: Category
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showFetchingIndicator: Boolean
}

const placeHolders: Record<Category, string> = {
  MOVIE: 'Search movie',
  TV: 'Search TV series',
  MUSIC: 'Search music',
  BOOK: 'Search book',
}

const SearchListBar = ({
  selected,
  onChange,
  showFetchingIndicator,
}: Props) => {
  return (
    <div className='flex w-full items-center rounded-lg bg-secondary p-2 focus-within:outline focus-within:outline-pink-500'>
      <BiSearch size={24} className='text-gray-500' />
      <input
        type='text'
        className='ml-2 w-full bg-secondary focus:outline-none'
        placeholder={placeHolders[selected]}
        onChange={onChange}
      />
      {showFetchingIndicator && (
        <div className='ml-2'>
          <div className='animate-spin'>
            <AiOutlineLoading3Quarters size={20} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchListBar
