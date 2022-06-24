import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import { getProviders, getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import ProviderButton from '@/components/ui/ProviderButton'

const Signin = ({ providers }: ServerSideProps) => {
  const router = useRouter()
  const { error } = router.query

  useEffect(() => {
    if (error === 'OAuthAccountNotLinked') {
      toast(
        'You already have an account with same email address. Please sign in with that account.',
        { type: 'error', autoClose: false, position: 'top-center' }
      )
    }
  })

  if (!providers) {
    return <div>No Providers</div>
  }

  return (
    <div className='flex h-[90vh] flex-col items-center justify-center overflow-hidden'>
      <div className='rounded-lg bg-white shadow-lg ring-1 ring-black/10'>
        <Image src='/images/logo.png' width={180} height={180} alt='logo' />
      </div>
      <span className='mt-5 text-2xl font-bold'>Sign in</span>
      <div className='mt-10'>
        {Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <ProviderButton id={provider.id} name={provider.name} />
          </div>
        ))}
      </div>
      <p className='gray-5 mt-2'>watashi.app</p>
    </div>
  )
}

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: { destination: '/' },
      props: {},
    }
  }
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default Signin
