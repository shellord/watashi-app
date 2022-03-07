import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteList } from '@/lib/client/list'

export const useDeleteList = () => {
  const queryClient = useQueryClient()

  return useMutation(deleteList, {
    onMutate: () => {
      toast.loading('Deleting list', {
        type: 'info',
        toastId: 'save-list',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userList')
      toast.update('save-list', {
        render: 'List successfully Deleted!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    },
    onError: (error: Error) => {
      toast.update('save-list', {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
      })
    },
  })
}
