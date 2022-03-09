import { useMutation } from 'react-query'

import { followUser } from '@/lib/client/follows'

export const useFollowUser = () => {
  return useMutation(followUser)
}
