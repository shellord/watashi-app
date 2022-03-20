import moment from 'moment'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useGetNotifications } from '@/hooks/useGetNotifications'

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

        {data?.notifications?.map((notification) => (
          <div key={notification.id}>
            {notification.verb === 'FOLLOW' && (
              <div className='flex justify-between items-center'>
                <div className='flex items-center  space-x-1'>
                  <div className='relative w-5 h-5 rounded-full overflow-hidden'>
                    <Image
                      src={notification.actor.image as string}
                      alt='avatar'
                      layout='fill'
                    />
                  </div>
                  <div>
                    <p>
                      <Link href={`/${notification.actor.username}`}>
                        <a className='font-semibold'>
                          {notification.actor.name}
                        </a>
                      </Link>{' '}
                      followed you
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-sm'>
                    {moment(notification.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Notifications
