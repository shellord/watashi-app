import '@/styles/globals.css'
import '@/styles/nprogress.css'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import nProgress from 'nprogress'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.css'

import MainLayout from '@/components/layouts/MainLayout'

const queryClient = new QueryClient()

nProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', nProgress.start)
Router.events.on('routeChangeError', nProgress.done)
Router.events.on('routeChangeComplete', nProgress.done)

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
      </Head>
      <DefaultSeo
        title='Watashi'
        description='Share your interests with your friends and followers'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.watashi.app/',
          site_name: 'Watashi',
          images: [
            {
              url: 'https://www.watashi.app/images/banner.png',
              width: 800,
              height: 600,
              alt: 'watashi banner',
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ThemeProvider attribute='class'>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ThemeProvider>
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
