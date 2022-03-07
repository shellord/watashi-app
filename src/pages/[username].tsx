import { useGetUser } from '@/hooks/useGetUser'
import { useRouter } from 'next/router'
import Head from 'next/head'

import ProfileInfoSection from '@/components/Profile/ProfileInfoSection'
import { useCurrentUserList } from '@/hooks/useGetUserList'
import ListItemCard from '@/components/list/ListItemCard'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  const { user, status } = useGetUser(username)
  const { data: lists, status: listStatus } = useCurrentUserList(username)

  if (status === 'success' && !user) {
    return (
      <div className='flex h-56 items-center justify-center bg-white p-2'>
        <h1 className='text-xl'>User doesn&apos;t Exist!</h1>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{user?.username}</title>
      </Head>
      <div className='mt-2 overflow-hidden rounded shadow'>
        <ProfileInfoSection user={user} />
      </div>
      {lists && (
        <div className='mt-2 space-y-3 rounded bg-white p-3 shadow'>
          {lists.list.map((list) => (
            <div key={list.id}>
              <div className='mb-3 border-b pb-2'>
                <p className='text-lg font-semibold'>{list.name}</p>
              </div>
              <div className='flex space-x-3 overflow-x-auto'>
                {list.items.map((item) => (
                  <div key={item.id}>
                    <ListItemCard title={item.title} image={item.posterPath} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProfilePage
