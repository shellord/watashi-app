import Image from 'next/image'
import { HiHeart } from 'react-icons/hi'

const Landing = () => {
  return (
    <div>
      <div className='bg-primary p-4 pb-10 shadow rounded'>
        <div>
          <p className='text-4xl sm:text-7xl font-[800] text-primary text-center'>
            Watashi.
          </p>
          <p className='text-lg sm:text-xl text-pink-500 text-center'>
            Share Your Interests with your friends and followers
          </p>
        </div>
        <div className='mt-5' />
        <div className='flex flex-col items-center'>
          <div className='font-bold flex flex-col items-center'>
            <div className='bg-black/10 dark:bg-white/10 p-1 rounded shadow'>
              <div className='relative w-56 h-56'>
                <Image
                  src='/images/profile.png'
                  alt='profile'
                  layout='fill'
                  priority
                />
              </div>
            </div>
            <div className='mt-1' />
            <p className='text-primary text-xl'>Create a profile</p>
            <hr className='h-8 sm:h-12 w-[0.1rem]  bg-black dark:bg-white mt-2' />
            <div className='mt-2' />
            <div className='bg-black/10 dark:bg-white/10 p-1 rounded shadow'>
              <div className='dark:bg-black/10 p-1 shadow'>
                <p className='text-primary dark:text-gray-400 font-[400]'>
                  https://watashi.app/username
                </p>
              </div>
            </div>
            <div className='mt-1' />
            <p className='text-primary text-xl'>Copy your profile link </p>
            <hr className='h-8 sm:h-12 w-[0.1rem]  bg-black dark:bg-white mt-2' />
            <div className='shadow p-1'>
              <div className='bg-black/10 dark:bg-white/10 p-1 rounded shadow'>
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
            </div>
            <p className='text-primary text-xl text-center'>
              Share it with your friends and followers
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-center w-full mt-3'>
        <div className='flex items-center space-x-1 text-lg '>
          <span className='text-primary'>Made with </span>
          <HiHeart color='red' size={22} />
          <span className='text-primary'>by saheen</span>
        </div>
      </div>
    </div>
  )
}

export default Landing
