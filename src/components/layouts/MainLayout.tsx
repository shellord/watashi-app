import { PropsWithChildren } from 'react'
import NavBar from '@/components/NavBar'

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='h-screen bg-gray-100'>
      <NavBar />
      <div className='mx-auto max-w-2xl p-2'>{children}</div>
    </div>
  )
}

export default MainLayout
