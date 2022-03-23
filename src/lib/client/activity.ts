import { Activity, Item, List, User } from '@prisma/client'
import axios from 'axios'

export type FetchActivitiesResponse = {
  activityFeeds: (Activity & {
    actor: User
    target: List & {
      items: Item[]
    }
  })[]
}

export const fetchActivities = async () => {
  const activities = await axios.get<FetchActivitiesResponse>(`/api/activity`)
  if (activities.status === 200) {
    return activities.data
  }
  return null
}
