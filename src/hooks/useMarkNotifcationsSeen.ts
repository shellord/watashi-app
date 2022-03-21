import { useMutation, useQueryClient } from 'react-query'

import { markNotificationAsSeen } from '@/lib/client/notifications'

export const useMarkNotificationsSeen = () => {
  const queryClient = useQueryClient()

  return useMutation(markNotificationAsSeen, {
    onSuccess: async () => {
      queryClient.invalidateQueries('notifications')
    },
  })
}
