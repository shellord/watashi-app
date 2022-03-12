import { useSession } from 'next-auth/react'

const Test = () => {
  const session = useSession()
  const { data } = session
  return <div>{data?.user.name}</div>
}

export default Test
