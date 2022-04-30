import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'

import { useGetNotifications } from '@/hooks/useGetNotifications'
import { useMarkNotificationsSeen } from '@/hooks/useMarkNotifcationsSeen'

import CommentNotification from '@/components/notifications/CommentNotification'
import FollowNotification from '@/components/notifications/FollowNotification'

const Notifications: NextPage = () => {
  const { data, status, error } = useGetNotifications()
  const { mutate: markNotificationsSeen } = useMarkNotificationsSeen()

  useEffect(() => {
    markNotificationsSeen()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const EmptyNotifications = () => {
    return (
      <div>
        <p>
          You have no notifications
          <span className='text-xl'>🤷‍♂️</span>
        </p>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <div className='shadow mt-2 rounded bg-white p-2'>
        {status === 'loading' && <div className='mt-4'>Loading</div>}
        {data?.notifications.length === 0 && status === 'success' && (
          <EmptyNotifications />
        )}
        <div className='space-y-3'>
          {data?.notifications?.map((notification) => (
            <div key={notification.id}>
              {notification.verb === 'FOLLOW' && (
                <FollowNotification
                  name={notification.actor.name as string}
                  username={notification.actor.username as string}
                  image={notification.actor.image as string}
                  createdAt={notification.createdAt}
                  isActorVerified={notification.actor.isVerified}
                />
              )}
              {notification.verb === 'COMMENT' && (
                <CommentNotification
                  name={notification.actor.name as string}
                  username={notification.actor.username as string}
                  image={notification.actor.image as string}
                  createdAt={notification.createdAt}
                  isActorVerified={notification.actor.isVerified}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Notifications
