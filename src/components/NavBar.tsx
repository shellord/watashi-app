import Link from 'next/link'
import { useSession } from 'next-auth/react'

const NavBar = () => {
  const session = useSession()
  const { data: user } = session
  console.log(user)
  return (
    <div className='sticky top-0 z-10  bg-white shadow-sm'>
      <div className='mx-auto flex max-w-2xl items-center justify-between p-2'>
        <Link href='/'>
          <a className='inline text-2xl font-bold'>watashi</a>
        </Link>
        <div>
          {user ? (
            <p>sign out</p>
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
