import { NextPage } from 'next'

const Search: NextPage = () => {
  return (
    <div>
      <div className='bg-white shadow p-5 flex justify-center'>
        <input className='input-field p-2 w-96' placeholder='Search' />
      </div>
    </div>
  )
}

export default Search
