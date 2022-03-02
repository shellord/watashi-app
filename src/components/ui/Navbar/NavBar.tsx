import Link from 'next/link'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { IoAddCircleOutline } from 'react-icons/io5'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import NavbarMenu from '@/components/ui/Navbar/NavbarMenu'

const NavBar = () => {
  const { user, status } = useCurrentUser()

  return (
    <div className='sticky top-0 z-10  bg-white shadow-sm'>
      <div className='mx-auto flex max-w-2xl items-center justify-between px-4 py-2'>
        <Link href='/'>
          <a className='inline text-2xl font-bold'>watashi</a>
        </Link>
        <div
          className={`relative ${
            status !== 'success' ? 'top-[-1em] opacity-0' : 'opacity-1 top-0'
          } transition-all duration-300`}
        >
          {status === 'success' && user ? (
            <div className='flex items-center space-x-4'>
              <Link href='#'>
                <a>
                  <IoSearchOutline size={28} />
                </a>
              </Link>
              <Link href='/my-list'>
                <a>
                  <IoAddCircleOutline size={28} />
                </a>
              </Link>
              <Link href='/test'>
                <a>
                  <IoMdNotificationsOutline size={28} />
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
