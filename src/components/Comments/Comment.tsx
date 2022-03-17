import Image from 'next/image'

type Props = {
  text: string
  authorImageUrl: string
}
const Comment = ({ text, authorImageUrl }: Props) => {
  return (
    <div className='flex items-center'>
      <div className='w-5 h-5 relative'>
        <Image
          src={authorImageUrl}
          alt='author'
          className='rounded-full'
          layout='fill'
        />
      </div>
      <div className='ml-2'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment
