import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { updateUser } from '@/lib/client/user'

export const useUpdateUser = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation(updateUser, {
    onSuccess: (response) => {
      queryClient.invalidateQueries('currentUser')
      toast('Your profile has been updated!', {
        type: 'success',
      })
      const { username } = response.data
      router.push(`/${username}`)
    },
    onError: (error: Error) => {
      toast(error.message, {
        type: 'error',
      })
    },
  })
}
