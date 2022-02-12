import { api } from '@/lib/api'
import { User } from '@/types/user'
import axios, { AxiosError } from 'axios'

export const updateUser = async ({ name, username, bio, gender }: User) => {
  try {
    const res = await axios.put('/api/user', {
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
    api.put('/user/profile-photo', {
      dataUri,
    })
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
