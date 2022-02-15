// import useSession from '@/lib/next-auth-react-query'
import { useSession } from 'next-auth/react'

const Test = () => {
  const session = useSession()
  const { data } = session
  return <div>{data?.user.name}</div>
}

export default Test
