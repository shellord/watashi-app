import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from '@/components/layouts/MainLayout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
