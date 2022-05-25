import type { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useRef, useState } from 'react'
import { FiLogOut, FiSettings } from 'react-icons/fi'

type Props = {
  user: User
}

const ProfileMenu = ({ user }: Props) => {
  const { username, image } = user

  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false)
    }
  }, [])

  if (showMenu) {
    document.addEventListener('click', handleClickOutside)
  }
  if (!showMenu) {
    document.removeEventListener('click', handleClickOutside)
  }
  return (
    <div className='relative' ref={menuRef}>
      <button className='flex' onClick={() => setShowMenu(!showMenu)}>
        <Image
          src={image as string}
          width={25}
          height={25}
          className='rounded-full'
          alt='avatar'
        />
      </button>
      <div
        className={`absolute right-1 mt-4 flex flex-col  bg-primary shadow-lg transition-all ${
          showMenu
            ? 'translate-y-0 translate-x-0 opacity-100'
            : 'pointer-events-none -translate-y-2 translate-x-3 opacity-0'
        }`}
      >
        <div className='my-2'>
          <Link href={`/${username}`}>
            <a>
              <div className='flex items-center justify-center px-4 py-2 text-left hover:bg-secondary dark:hover:bg-secondary'>
                <div className='relative h-6 w-6'>
                  <Image
                    src={image as string}
                    layout='fill'
                    className='rounded-full'
                    alt='avatar'
                  />
                </div>
                <span className='ml-2'>Profile</span>
              </div>
            </a>
          </Link>
          <Link href={`/settings`}>
            <a>
              <div className='flex items-center justify-center px-4 py-2 text-left hover:bg-secondary dark:hover:bg-secondary'>
                <FiSettings size={20} />
                <span className='ml-2'>Settings</span>
              </div>
            </a>
          </Link>
          <button
            className='flex w-full items-center justify-center py-2 px-4  text-left hover:bg-secondary dark:hover:bg-secondary'
            onClick={() => signOut()}
          >
            <FiLogOut size={20} />
            <span className='ml-2'>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileMenu
