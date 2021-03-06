import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'

import NavBar from '@/components/ui/navbar'

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <div className='bg-secondary'>
        <div className='mx-auto max-w-2xl px-4 py-2'>{children}</div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default MainLayout
