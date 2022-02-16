import { useMutation, useQueryClient } from 'react-query'
import { updateUser } from '@/lib/api/user'

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation(updateUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('currentUser')
    },
    onError: (error: Error) => {},
  })
}
