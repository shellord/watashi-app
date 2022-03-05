import axios, { AxiosError } from 'axios'

export type CreateList = {
  name: string
  category: string
  items: number[]
}

export const createList = async ({ name, category, items }: CreateList) => {
  try {
    const res = await axios.post('/api/list/create', {
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
