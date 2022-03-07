import { useQuery } from 'react-query'
import { fetchUserList } from '@/lib/client/list'

export const useCurrentUserList = (username: string) => {
  return useQuery(['userList', username], () => fetchUserList(username))
}
