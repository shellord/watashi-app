import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { deleteComment } from '@/lib/client/comment'

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments')
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`)
    },
  })
}
