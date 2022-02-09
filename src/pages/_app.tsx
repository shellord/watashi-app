import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from '@/components/layouts/MainLayout'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  )
}

export default MyApp
