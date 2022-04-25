import Head from 'next/head'
import { useRouter } from 'next/router'

import { useAddComment } from '@/hooks/useAddComment'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useFollowUser } from '@/hooks/useFollowUser'
import { useGetFollows } from '@/hooks/useGetFollows'
import { useGetUser } from '@/hooks/useGetUser'
import { useGetUserComments } from '@/hooks/useGetUserComments'
import { useGetUserList } from '@/hooks/useGetUserList'
import { useUnFollowUser } from '@/hooks/useUnFollowUser'

import Comment from '@/components/comment/Comment'
import CommentField from '@/components/comment/CommentField'
import ListContainer from '@/components/list/ListContainer'
import ProfileInfoSection from '@/components/profile/ProfileInfoSection'
import ProfileInfoSectionSkelton from '@/components/skeletons/ProfileInfoSectionSkelton'
import SkeletonList from '@/components/skeletons/SkeletonList'

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query as { username: string }

  const { user, status } = useGetUser(username)
  const { data: lists, status: listStatus } = useGetUserList(username)
  const { user: currentUser, status: currentUserStatus } = useCurrentUser()
  const { data: comments, status: commentsStatus } =
    useGetUserComments(username)
  const userId = user?.id as string
  const { data: follows, status: followsStatus } = useGetFollows(userId)
  const followUserMutation = useFollowUser(userId)
  const unFollowUserMutation = useUnFollowUser(userId)
  const addCommentMutation = useAddComment()
  const onFollowHandler = () => {
    if (!user || !user.id) return
    followUserMutation.mutate(user.id)
  }

  const onUnFollowHandler = () => {
    if (!user || !user.id) return
    unFollowUserMutation.mutate(user.id)
  }

  const onCommentHandler = (text: string) => {
    if (!user || !user.username) return
    addCommentMutation.mutate({
      username: user.username,
      text,
    })
  }

  if (!user && status !== 'loading') {
    return (
      <div className='flex h-56 items-center justify-center bg-white p-2'>
        <h1 className='text-xl'>User doesn&apos;t Exist!</h1>
      </div>
    )
  }

  const isFollowing =
    follows?.followers.find((follower) => follower.id === currentUser?.id) !==
    undefined

  const isSameUser = currentUser?.id === user?.id

  const EmptyList = () => (
    <div className='flex h-56 items-center justify-center bg-white p-2 shadow flex-col'>
      <h1 className='text-lg'>{user?.name} doesn&apos;t have any list yet </h1>
      <h1 className='text-xl'>🫤</h1>
    </div>
  )

  return (
    <>
      <Head>
        <title>{user?.username}</title>
      </Head>
      <div className='mt-2 overflow-hidden rounded shadow'>
        {user && user.id && follows ? (
          <ProfileInfoSection
            user={user}
            isSameUser={isSameUser}
            onFollow={onFollowHandler}
            isFollowing={isFollowing}
            onUnFollow={onUnFollowHandler}
            followers={follows.followers}
            following={follows.following}
            isVerified={user.isVerified}
          />
        ) : (
          <ProfileInfoSectionSkelton />
        )}
      </div>

      {!lists && (
        <div className='bg-white mt-2 p-3'>
          <SkeletonList />
        </div>
      )}
      {lists && lists.list.length > 0 ? (
        <div className='mt-2 space-y-3 rounded bg-white p-3 shadow'>
          {lists.list.map((list) => (
            <div key={list.id}>
              <ListContainer listName={list.name} listItems={list.items} />
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-5'>
          <EmptyList />
        </div>
      )}
      <div className='shadow mt-2 bg-white p-2'>
        <p className='font-semibold border-b pb-2 text-lg'>Comments</p>

        {currentUser && currentUser.image ? (
          <div className='mt-3'>
            <CommentField
              imageUrl={currentUser.image}
              onComment={onCommentHandler}
            />
          </div>
        ) : (
          <div className='mt-3'>Login to comment</div>
        )}
        {comments && <Comment comments={comments} />}
      </div>
    </>
  )
}

export default ProfilePage
