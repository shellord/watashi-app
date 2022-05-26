import Image from 'next/image'

type Props = {
  imageUrl: string
  onComment: (text: string) => void
}

const CommentField = ({ imageUrl, onComment }: Props) => {
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { comment } = event.currentTarget.elements as any
    onComment(comment.value)
    comment.value = ''
  }

  return (
    <div className='bg-primary'>
      <form onSubmit={onSubmitHandler}>
        <div className='flex'>
          <div className='relative w-[2.4rem] h-[2.4rem] flex-shrink-0'>
            <Image
              src={imageUrl}
              alt='avatar'
              layout='fill'
              className='rounded-full'
            />
          </div>

          <div className='ml-2 w-full'>
            <textarea
              id='comment'
              className='input-field w-full resize-none'
              placeholder='Add a comment'
              maxLength={500}
              rows={2}
            />
          </div>
        </div>

        <div className='flex justify-end mt-2'>
          <button className='btn-secondary' type='submit'>
            Comment
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentField
