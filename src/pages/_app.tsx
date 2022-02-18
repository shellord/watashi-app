import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from '@/components/layouts/MainLayout'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
