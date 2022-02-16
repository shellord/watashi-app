import Link from 'next/link'
import { signOut } from 'next-auth/react'

import useCurrentUser from '@/hooks/useCurrentUser'
import ProfileMenu from '@/components/ProfileMenu'

const NavBar = () => {
  const [user, loading] = useCurrentUser()

  return (
    <div className='sticky top-0 z-10  bg-white shadow-sm'>
      <div className='mx-auto flex max-w-2xl items-center justify-between p-2'>
        <Link href='/'>
          <a className='inline text-2xl font-bold'>watashi</a>
        </Link>
        <div
          className={`relative ${
            loading ? 'top-[-1em] opacity-0' : 'opacity-1 top-0'
          } transition-all duration-300`}
        >
          {!loading && user ? (
            <div className='flex'>
              <button onClick={() => signOut()} className='mr-1'>
                sign out {user?.name}
              </button>
              <ProfileMenu image={user?.image as string} />
            </div>
          ) : (
            <Link href='/signin'>
              <a className='inline text-lg font-bold text-blue-500'>Sign in</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
