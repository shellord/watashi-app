import Image from 'next/image'
import { HiHeart } from 'react-icons/hi'

const Landing = () => {
  return (
    <div>
      <div className='bg-primary p-4 shadow rounded'>
        <div>
          <p className='text-4xl sm:text-7xl font-[800] text-primary text-center sm:text-left'>
            Watashi.
          </p>
          <p className='text-lg sm:text-xl text-pink-500 text-center sm:text-left'>
            Share Your Interests with your Friends and Followers
          </p>
        </div>
        <div className='mt-5' />
        <div className='flex flex-col items-center'>
          <div className='font-bold flex flex-col items-center'>
            <div className='relative w-72 h-60'>
              <Image
                src='/images/profile.png'
                alt='profile'
                layout='fill'
                priority
              />
            </div>
            <div className='mt-1' />
            <p className='text-primary text-xl'>Create a profile</p>
            <hr className='h-8 sm:h-12 w-[0.1rem]  bg-black dark:bg-white mt-2' />
            <div className='bg-black/10 p-1 shadow'>
              <p className='text-primary text-gray-400 font-[400]'>
                https://watashi.app/username
              </p>
            </div>
            <div className='mt-1' />
            <p className='text-primary text-xl'>Copy your profile link </p>
            <hr className='h-8 sm:h-12 w-[0.1rem]  bg-black dark:bg-white mt-2' />
            <div className='shadow p-1'>
              <div className='relative w-72 h-32 '>
                <Image
                  src='/images/insta.png'
                  alt='profile'
                  layout='fill'
                  className='object-fill'
                  priority
                />
              </div>
            </div>
            <p className='text-primary text-xl text-center'>
              Share it with your friends and and followers
            </p>
          </div>
        </div>
      </div>
      <div className='left-0 bottom-0 absolute flex justify-center w-full mb-5'>
        <div className='flex items-center space-x-1 text-lg '>
          <span>Made with </span>
          <HiHeart color='red' size={22} />
          <span>by saheen</span>
        </div>
      </div>
    </div>
  )
}

export default Landing
