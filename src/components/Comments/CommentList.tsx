import Comment from '@/components/Comments/Comment'
import CommentsContainer from '@/components/Comments/CommentsContainer'

import type { FetchUserCommentsResponse } from '@/lib/client/comment'

export type Props = {
  comments: FetchUserCommentsResponse
}
const CommentList = ({ comments }: Props) => {
  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            text={comment.text}
            authorImageUrl={comment.author.image as string}
          />
        </div>
      ))}
    </CommentsContainer>
  )
}

export default CommentList
