import { useGetUser } from '@/hooks/useGetUser'
import { useRouter } from 'next/router'
import Head from 'next/head'

import ProfileInfoSection from '@/components/Profile/ProfileInfoSection'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  const { user, status } = useGetUser(username)
  const { user: currentUser, status: currentUserStatus } = useCurrentUser()

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
      <div className='mt-2 shadow '>
        <ProfileInfoSection user={user} />
      </div>
      {/* <div className='mt-1'>
        <FavouriteListSection />
      </div> */}
    </>
  )
}

export default ProfilePage
