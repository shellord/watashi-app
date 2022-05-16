import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import NavBar from '@/components/ui/navbar'

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='h-screen'>
      <NavBar />
      <div className='mx-auto max-w-2xl px-4 py-2'>{children}</div>
      <ToastContainer />
    </div>
  )
}

export default MainLayout
