import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { createList } from '@/lib/client/list'

export const useCreateList = () => {
  return useMutation(createList, {
    onSuccess: (response) => {
      toast('Your list has been created!', {
        type: 'success',
      })
    },
    onError: (error: Error) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })
}
