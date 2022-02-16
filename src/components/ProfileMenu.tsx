import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useState } from 'react'

type Props = {
  image: string
}

const ProfileMenu = ({ image }: Props) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='relative'>
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
        className={
          'absolute right-1 mt-3 flex w-32 flex-col bg-white opacity-0'
        }
      >
        <button className='w-full p-2 text-left hover:bg-gray-200'>
          Edit Profile
        </button>
        <button className='w-full p-2 text-left hover:bg-gray-200'>
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default ProfileMenu
