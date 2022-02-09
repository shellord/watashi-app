import { getProviders, getSession } from 'next-auth/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import ProviderButton from '@/components/ProviderButton'
import Image from 'next/image'

const Signin = ({ providers }: ServerSideProps) => {
  if (!providers) {
    return <div>No Providers</div>
  }

  return (
    <div className='flex h-[90vh] flex-col items-center justify-center overflow-scroll'>
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
