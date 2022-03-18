import { PropsWithChildren } from 'react'

const CommentsContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className='bg-white'>
      <div className='mt-3'>{children}</div>
    </div>
  )
}

export default CommentsContainer
