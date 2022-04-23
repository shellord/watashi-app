import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { createList } from '@/lib/client/list'

export const useCreateList = () => {
  return useMutation(createList, {
    onMutate: () => {
      toast.loading('Creating your list...', {
        type: 'info',
        toastId: 'creating-list',
      })
    },
    onSuccess: (response) => {
      toast.update('creating-list', {
        render: 'List successfully created!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    },
    onError: (error: Error) => {
      toast.update('creating-list', {
        render: `Error: ${error.message}`,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })
}
