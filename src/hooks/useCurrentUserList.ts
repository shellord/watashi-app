import { useQuery } from 'react-query'

import { fetchList } from '@/lib/client/list'

export const useCurrentUserList = () => {
  return useQuery(['userList'], fetchList)
}
