import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to Watashi</title>
      </Head>
      <div className='shadow mt-2 rounded bg-primary p-2 px-5 sm:px-10'>
        <p className='text-md text-center text-sm font-semibold'>Settings</p>
        <div className='mt-3'>
          <Link href='/settings/edit-profile'>
            <a>
              <p className='text-center p-3 border-b'>Edit Profile</p>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Settings
