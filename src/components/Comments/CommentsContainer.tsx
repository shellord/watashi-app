import { PropsWithChildren } from 'react'

const CommentsContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='bg-white p-2 rounded'>
      <p className='font-semibold'>Comments</p>
      {children}
    </div>
  )
}

export default CommentsContainer
