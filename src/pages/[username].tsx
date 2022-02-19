import { useGetUser } from '@/hooks/useGetUser'
import { useRouter } from 'next/router'
import ProfileInfoSection from '@/components/ProfileInfoSection'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  const { data: user, loading } = useGetUser(username)
  const { data: currentUser, loading: currentUserLoading } = useCurrentUser()

  if (!loading && !user) {
    return (
      <div className='flex h-56 items-center justify-center bg-white p-2'>
        <h1 className='text-xl'>User doesn&apos;t Exist!</h1>
      </div>
    )
  }

  return (
    <div className='mt-2 shadow'>
      <ProfileInfoSection user={user} />
    </div>
  )
}

export default ProfilePage
