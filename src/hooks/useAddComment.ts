import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { addComment } from '@/lib/client/comment'

export const useAddComment = () => {
  const queryClient = useQueryClient()
  return useMutation(addComment, {
    onSuccess: (_, { username }) => {
      queryClient.invalidateQueries(['comments', username])
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`)
    },
  })
}
