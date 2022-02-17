import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { updateProfilePhoto } from '@/lib/api/user'

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient()

  return useMutation(updateProfilePhoto, {
    onMutate: () => {
      toast.loading('Uploading your photo...', {
        type: 'info',
        toastId: 'uploading-photo',
      })
    },
    onSuccess: () => {
      toast.update('uploading-photo', {
        render: 'Photo successfully uploaded!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
      queryClient.invalidateQueries('currentUser')
    },
    onError: (error: Error) => {
      toast.update('uploading-photo', {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
      })
    },
  })
}
