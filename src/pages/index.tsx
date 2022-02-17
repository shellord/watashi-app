import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Watashi</title>
      </Head>
      <div>
        <p className='text-black'>Hello World</p>
        <Link href='/test'>
          <a>
            <button>Go to test page</button>
          </a>
        </Link>
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
