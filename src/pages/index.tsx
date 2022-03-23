import type { GetServerSidePropsContext, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import { useGetActivities } from '@/hooks/useGetActivities'

const Home: NextPage = () => {
  const {
    data: activities,
    status: activitiesStatus,
    error: activitiesError,
  } = useGetActivities()
  console.log(activities)

  return (
    <>
      <Head>
        <title>Watashi</title>
      </Head>
      <div className='bg-white shadow p-2 rounded'>
        <p className='text-black'>Hello World</p>
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

export default Home
