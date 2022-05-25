import { NextPage } from 'next'

import EditProfile from '@/components/profile/EditProfile'

const EditProfilePage: NextPage = () => {
  return (
    <>
      <div className='shadow mt-2 rounded bg-primary p-2 px-5 sm:px-10'>
        <p className='text-md text-center text-sm font-semibold'>
          Setup your profile
        </p>
        <EditProfile />
      </div>
    </>
  )
}

export default EditProfilePage
