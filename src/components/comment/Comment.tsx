import CommentItem from '@/components/comment/CommentItem'
import CommentsContainer from '@/components/comment/CommentsContainer'

import type { FetchUserCommentsResponse } from '@/lib/client/comment'

export type Props = {
  comments: FetchUserCommentsResponse
}

const Comment = ({ comments }: Props) => {
  const reversedComments = [...comments].reverse()
  return (
    <CommentsContainer>
      {comments.length === 0 && (
        <div className='flex items-center flex-col bg-primary'>
          <p>No Comments yet</p>
          <p className='flex items-center'>
            Be the First one to comment <span className='text-2xl'>😀</span>{' '}
          </p>
        </div>
      )}
      <div className='space-y-3 min-h-28 bg-primary'>
        {reversedComments.map((comment) => (
          <div key={comment.id}>
            <CommentItem
              id={comment.id}
              text={comment.text}
              authorImageUrl={comment.author.image as string}
              authorUsername={comment.author.username as string}
              authorName={comment.author.name as string}
              createdAt={comment.createdAt}
              isAuthorVerified={comment.author.isVerified}
            />
          </div>
        ))}
      </div>
    </CommentsContainer>
  )
}

export default Comment
