import { GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

import EditProfile from '@/components/profile/EditProfile'

const EditProfilePage: NextPage = () => {
  return (
    <>
      <div className='shadow mt-2 rounded bg-primary p-2 px-5 sm:px-10'>
        <div className='flex items-center w-full'>
          <div>
            <Link href='/settings'>
              <a>
                <BiArrowBack size={22} />
              </a>
            </Link>
          </div>
          <p className='flex justify-center w-full font-semibold'>
            Setup your profile
          </p>
        </div>
        <EditProfile />
      </div>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: { destination: '/signin' },
      props: {},
    }
  }
  return {
    props: {
      session,
    },
  }
}

export default EditProfilePage
