import Image from 'next/image'
import { signOut } from 'next-auth/react'
import React, { useCallback, useRef, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'

type Props = {
  image: string
}

const ProfileMenu = ({ image }: Props) => {
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
          src={image}
          width={25}
          height={25}
          className='rounded-full'
          alt='avatar'
        />
      </button>
      <div
        className={`absolute right-1 mt-4 flex w-28 flex-col  bg-white shadow-lg transition-all ${
          showMenu
            ? 'translate-y-0 translate-x-0 opacity-100'
            : '-translate-y-2 translate-x-3 opacity-0'
        }`}
      >
        <div className='my-2'>
          <button className='flex items-center justify-center px-4 py-2 text-left hover:bg-gray-200'>
            <div className='relative h-6 w-6'>
              <Image
                src={image}
                layout='fill'
                className='rounded-full'
                alt='avatar'
              />
            </div>
            <span className='ml-2'>Profile</span>
          </button>
          <button
            className='flex w-full items-center justify-center py-2 px-4  text-left hover:bg-gray-200'
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
