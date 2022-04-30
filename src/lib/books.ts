import { ListItem } from '@/types/list'
import axios, { AxiosError } from 'axios'

export const searchBook = async (query: string, apiKey: string) => {
  const response = await axios.get(
    'https://www.googleapis.com/books/v1/volumes',
    {
      params: {
        q: query,
        key: apiKey,
      },
    }
  )
  return response.data
}

export const getDetailsOfBooks = async (itemIds: string[], apiKey: string) => {
  const results: ListItem[] = []
  try {
    await Promise.all(
      itemIds.map(async (itemId) => {
        const res = await getDetails(itemId, apiKey)
        if (res)
          results.push({
            id: res.id,
            title: res.volumeInfo.title,
            poster_path: res.volumeInfo.imageLinks.thumbnail,
          })
      })
    )
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError
      if (serverError && serverError.response) {
        throw Error(serverError.response.data.status_message)
      }
    }
    throw Error('Something went wrong')
  }

  return results
}
export const getDetails = async (itemId: string, apiKey: string) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${itemId}`,
    {
      params: {
        key: apiKey,
      },
    }
  )
  return response.data
}
