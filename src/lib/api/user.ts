import { api } from '@/lib/api'
import { User } from '@/types/user'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { generateAvatar } from '@/lib/avatar'

export const fetchCurrentUser = async (): Promise<User | null> => {
  const res = await fetch('/api/user')
  const user = await res.json()
  if (user.error) {
    return null
  }
  return user
}

export const fetchUser = async (username: string): Promise<User | null> => {
  const res = await fetch(`/api/user/${username}`)
  const user = await res.json()
  if (user.error) {
    return null
  }
  return user
}

export const updateUser = async ({ name, username, bio, gender }: User) => {
  try {
    const res = await axios.put<User>('/api/user', {
      name,
      username,
      bio,
      gender,
    })
    return res
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError
      if (serverError && serverError.response) {
        throw Error(serverError.response.data.error)
      }
    }
    throw Error('Something went wrong')
  }
}

export const updateProfilePhoto = async (dataUri: string) => {
  try {
    const response = await api.put('/user/profile-photo', {
      dataUri,
    })
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError
      if (serverError && serverError.response) {
        throw Error(serverError.response.data.error)
      }
    }
    throw Error('Something went wrong')
  }
}

export const deleteProfilePhoto = async (name: string) => {
  try {
    const response = await updateProfilePhoto(generateAvatar(name))
    return response
  } catch (error) {
    throw Error('Something went wrong')
  }
}
