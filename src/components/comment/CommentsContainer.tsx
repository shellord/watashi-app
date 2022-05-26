import { PropsWithChildren } from 'react'

const CommentsContainer = ({ children }: PropsWithChildren<{}>) => {
  return <div className='mt-3'>{children}</div>
}

export default CommentsContainer
