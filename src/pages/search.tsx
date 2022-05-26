import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import useDebounce from '@/hooks/useDebounce'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'
import useSearchUser from '@/hooks/useSearchUser'

import { UserCard } from '@/components/cards/UserCard'

const Search: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, 600)
  const { data: suggestedUsers, status: suggestedUsersStatus } =
    useGetSuggestedUsers()
  const { data: userSearchResult, isFetching } =
    useSearchUser(debouncedSearchQuery)

  return (
    <div>
      <div className='bg-primary shadow p-5 flex justify-center '>
        <div className='w-96 flex items-center rounded-lg bg-secondary p-1 focus-within:outline focus-within:outline-pink-500 '>
          <input
            placeholder='Search'
            className='ml-2 w-full bg-secondary  outline-none'
            onChange={(event) => setSearchQuery(event.target.value)}
            autoFocus
          />
          {isFetching && (
            <div className='animate-spin'>
              <AiOutlineLoading3Quarters size={20} />
            </div>
          )}
        </div>
      </div>

      <div className='mt-3'>
        {searchQuery.length !== 0 &&
          userSearchResult?.users.map((user) => (
            <div
              key={user.id}
              className='flex items-center space-x-5 bg-primary p-3 rounded shadow justify-center'
            >
              <Link href={`/${user.username}`}>
                <a>
                  <div className='w-56 flex items-center'>
                    <Image
                      src={user.image!}
                      alt='userImage'
                      width={50}
                      height={50}
                      className='rounded-full'
                    />
                    <div className='ml-5'>
                      <p className='font-semibold'> {user.name}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
      {searchQuery.length === 0 && (
        <div className='bg-primary p-2 rounded-sm shadow'>
          <div className='mb-3 border-b pb-3'>
            <p className='font-bold'>Cool people to follow</p>
          </div>
          {suggestedUsersStatus === 'success' && (
            <div className='flex flex-wrap'>
              {suggestedUsers?.map((user) => (
                <div key={user.id} className='w-1/2 sm:w-1/3 p-1'>
                  <UserCard
                    id={user.id}
                    name={user.name!}
                    username={user.username!}
                    image={user.image!}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: { destination: '/signin' },
      props: {},
    }
  }
  return {
    props: {
      session,
    },
  }
}

export default Search
