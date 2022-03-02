import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import EditProfile from '@/components/Profile/EditProfile'

const NewUser = () => {
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/',
      },
      props: {},
    }
  }
  return {
    props: {
      session,
    },
  }
}
export default NewUser