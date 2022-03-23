import { useQuery } from 'react-query'

import { fetchActivities } from '@/lib/client/activity'

export const useGetActivities = () => {
  return useQuery('activities', fetchActivities)
}
