import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteProfilePhoto } from '@/lib/client/user'

export const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteProfilePhoto, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('currentUser')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}
