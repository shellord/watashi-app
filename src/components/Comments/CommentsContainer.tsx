import { PropsWithChildren } from 'react'

const CommentsContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='bg-white p-2 rounded'>
      <p className='font-semibold border-b pb-2 text-lg'>Comments</p>
      <div className='mt-3'>{children}</div>
    </div>
  )
}

export default CommentsContainer
