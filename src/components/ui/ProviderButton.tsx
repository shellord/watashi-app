import { signIn } from 'next-auth/react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

type Props = {
  id: string
  name: string
}

const ProviderButton = ({ id, name }: Props) => {
  if (id === 'google') {
    return (
      <button
        onClick={() => signIn(id)}
        className='mb-5 flex  w-64 items-center  rounded bg-primary p-3 pl-10 text-primary shadow-lg ring-1 ring-black hover:bg-blue-100 dark:hover:bg-gray-700   hover:ring-blue-500'
      >
        <FcGoogle size={18} />
        <p className='ml-2'> Sign up with {name} </p>
      </button>
    )
  }
  if (id === 'facebook') {
    return (
      <button
        onClick={() => signIn(id)}
        className='mb-5 flex w-64 items-center rounded bg-primary p-3 pl-10  text-primary shadow-lg ring-1 ring-black hover:bg-blue-100 dark:hover:bg-gray-700  hover:ring-blue-500'
      >
        <FaFacebook size={18} />
        <p className='ml-2 '> Sign up with {name} </p>
      </button>
    )
  }
  return null
}

export default ProviderButton
