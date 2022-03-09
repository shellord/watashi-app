import { useMutation } from 'react-query'

import { followUser } from '@/lib/client/follow'

export const useFollowUser = () => {
  return useMutation(followUser)
}
