import { PropsWithChildren } from 'react'

const MainLayout = ({ children }: PropsWithChildren<{}>) => {
  return <div className='bg-red-500'>{children}</div>
}

export default MainLayout
