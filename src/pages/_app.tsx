import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import MainLayout from '@/components/layouts/MainLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
