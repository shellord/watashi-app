import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { changeOrder } from '@/lib/client/list'

export const useChangeListOrder = () => {
  const queryClient = useQueryClient()
  return useMutation(changeOrder, {
    onMutate: () => {
      toast.loading('Saving...', {
        toastId: 'change-list-order',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries('userList')
      toast.update('change-list-order', {
        render: ' ✅ Saved',
        isLoading: false,
        autoClose: 3000,
      })
    },
  })
}
