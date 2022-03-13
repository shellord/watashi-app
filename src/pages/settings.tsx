import { NextPage } from 'next'
import Head from 'next/head'

import EditProfile from '@/components/Profile/EditProfile'

const NewUser: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to Watashi</title>
      </Head>
      <div className='shadow-s mt-2 rounded bg-white p-2 px-5 sm:px-10'>
        <p className='text-md text-center text-sm font-semibold'>
          Setup your profile
        </p>
        <EditProfile />
      </div>
    </>
  )
}

export default NewUser
