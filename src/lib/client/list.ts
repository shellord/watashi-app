import axios, { AxiosError } from 'axios'
import { List, Item, Category } from '@prisma/client'

export type CreateList = {
  name: string
  category: string
  items: string[]
}

export type UpdateList = {
  id: string
  name: string
  items: string[]
}

export type UserList = {
  list: {
    name: string
    id: string
    category: Category
    items: Item[]
  }[]
}

export const createList = async ({ name, category, items }: CreateList) => {
  try {
    const res = await axios.post('/api/list', {
      name,
      category,
      items,
    })
    return res.data
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

export const updateList = async ({ id, name, items }: UpdateList) => {
  try {
    const res = await axios.put(
      '/api/list',
      {
        name,
        items,
      },
      {
        params: {
          id,
        },
      }
    )
    return res.data
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
export const fetchList = async () => {
  try {
    const res = await axios.get<
      (List & {
        items: Item[]
      })[]
    >('/api/list')
    return res.data
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

export const deleteList = async ({ id }: { id: string }) => {
  try {
    const res = await axios.delete('/api/list', {
      params: {
        id,
      },
    })
    return res.data
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

export const fetchUserList = async (username: string) => {
  try {
    const res = await axios.get<UserList>(`/api/list/${username}`)
    return res.data
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
