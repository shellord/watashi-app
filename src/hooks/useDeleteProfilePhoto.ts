import { useMutation, useQueryClient } from 'react-query'
import { deleteProfilePhoto } from '@/lib/client/user'
import { toast } from 'react-toastify'

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
