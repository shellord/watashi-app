import { useMutation, useQueryClient } from 'react-query'
import { deleteProfilePhoto } from '@/lib/api/user'

export const useDeleteProfilePhoto = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteProfilePhoto, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('currentUser')
    },
    onError: (error: Error) => {},
  })
}
