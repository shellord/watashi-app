import { Notification, User } from '@prisma/client'
import axios from 'axios'

type GetNotificationsResponse = {
  notifications: (Notification & {
    actor: User
  })[]
}

export const fetchNotifications = async () => {
  const response = await axios.get<GetNotificationsResponse>(
    '/api/notifications'
  )
  return response.data
}

export const markNotificationAsSeen = async () => {
  const response = await axios.patch('/api/notifications')
  return response.data
}
