import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Watashi</title>
      </Head>
      <div>
        <p className="text-yellow-500">Hello World</p>
      </div>
    </>
  )
}

export default Home
