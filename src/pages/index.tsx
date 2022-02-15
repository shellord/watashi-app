import type { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'

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

export default Home
