import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import ActivityContainer from '@/components/activity/ActivityContainer'
import Landing from '@/components/landing'

const Home: NextPage<ServerSideProps> = ({ sessionData }) => {
  return (
    <>
      <Head>
        <title>Watashi</title>
      </Head>

      {sessionData ? <ActivityContainer /> : <Landing />}
    </>
  )
}

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context
  const session = await getSession({ req })
  return {
    props: {
      sessionData: session,
    },
  }
}

export default Home
