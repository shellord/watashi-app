import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useGetNotifications } from '@/hooks/useGetNotifications'

import FollowNotification from '@/components/notifications/FollowNotification'

const Notifications: NextPage = () => {
  const { data, status, error } = useGetNotifications()
  console.log(data?.notifications)
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>
      <div className='shadow mt-2 rounded bg-white p-2'>
        {status === 'loading' && <div className='mt-4'>Loading</div>}
        <div className='space-y-3'>
          {data?.notifications?.map((notification) => (
            <div key={notification.id}>
              {notification.verb === 'FOLLOW' && (
                <FollowNotification
                  name={notification.actor.name as string}
                  username={notification.actor.username as string}
                  image={notification.actor.image as string}
                  createdAt={notification.createdAt}
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
