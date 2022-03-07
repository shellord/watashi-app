import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { updateList } from '@/lib/client/list'

export const useUpdateList = () => {
  return useMutation(updateList, {
    onMutate: () => {
      toast.loading('Saving your list...', {
        type: 'info',
        toastId: 'save-list',
      })
    },
    onSuccess: (response) => {
      toast.update('save-list', {
        render: 'List successfully Saved!',
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
