import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'

import { unfollowUser } from '@/lib/client/follows'

export const useUnFollowUser = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation(unfollowUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['follows', id])
    },
  })
}
