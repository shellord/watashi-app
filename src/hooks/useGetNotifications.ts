import { useQuery } from 'react-query'

import { fetchNotifications } from '@/lib/client/notifications'

export const useGetNotifications = () => {
  return useQuery('notifications', fetchNotifications)
}
