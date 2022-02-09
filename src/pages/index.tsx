import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Watashi</title>
      </Head>
      <div>
        <p className='text-black'>Hello World</p>
      </div>
    </>
  )
}

export default Home
