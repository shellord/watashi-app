import { useMutation } from 'react-query'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { followUser } from '@/lib/client/follows'

export const useFollowUser = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation(followUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['follows', id])
    },
    onError: (error: Error) => {
      toast(error.message, {
        type: 'error',
        autoClose: 5000,
        position: 'top-right',
      })
    },
  })
}
