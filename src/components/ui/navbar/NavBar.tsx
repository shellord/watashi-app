import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdNotifications, IoMdNotificationsOutline } from 'react-icons/io'
import {
  IoAddCircle,
  IoAddCircleOutline,
  IoSearch,
  IoSearchOutline,
} from 'react-icons/io5'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useGetNotifications } from '@/hooks/useGetNotifications'

import NavbarMenu from '@/components/ui/navbar/NavbarMenu'

const NavBar = () => {
  const { user, status } = useCurrentUser()
  const router = useRouter()
  const { data: notifications, status: unseenNotificationStatus } =
    useGetNotifications()

  const unseenNotificationCount = notifications?.notifications.filter(
    (notification) => !notification.seen
  ).length

  return (
    <div className='sticky top-0 z-20  bg-white shadow-sm'>
      <div className='mx-auto flex max-w-2xl items-center justify-between px-4 py-2'>
        <Link href='/'>
          <a className='inline text-2xl font-bold'>watashi</a>
        </Link>
        <div
          className={`relative ${
            status === 'loading' ? 'top-[-1em] opacity-0' : 'opacity-1 top-0'
          } transition-all duration-300`}
        >
          {status === 'success' && user ? (
            <div className='flex items-center space-x-4'>
              <Link href='/search'>
                <a>
                  {router.pathname === '/search' ? (
                    <IoSearch size={28} />
                  ) : (
                    <IoSearchOutline size={28} />
                  )}
                </a>
              </Link>
              <Link href='/my-list'>
                <a>
                  {router.pathname === '/my-list' ? (
                    <IoAddCircle size={28} />
                  ) : (
                    <IoAddCircleOutline size={28} />
                  )}
                </a>
              </Link>
              <Link href='/notifications'>
                <a>
                  <div className='relative'>
                    {router.pathname === '/notifications' ? (
                      <IoMdNotifications size={28} />
                    ) : (
                      <IoMdNotificationsOutline size={28} />
                    )}

                    {unseenNotificationCount && unseenNotificationCount > 0 ? (
                      <span className='absolute top-0 -right-2 -translate-y-2 bg-red-500 rounded-full px-2 py-1 text-xs'>
                        {unseenNotificationCount}
                      </span>
                    ) : null}
                  </div>
                </a>
              </Link>
              <NavbarMenu user={user} />
            </div>
          ) : (
            <Link href='/signin'>
              <a className='inline text-lg font-bold text-pink-500'>Sign in</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
