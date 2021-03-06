import { ListItem } from '@/types/list'
import axios, { AxiosError } from 'axios'

export const tmdbSearch = async (
  apiKey: string,
  query: string,
  includeAdult: boolean = false,
  mediaType: 'movie' | 'tv' | 'person' = 'movie',
  page: number = 1,
  language: string = 'en-US'
) => {
  const url = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${query}&include_adult=${includeAdult}&page=${page}&language=${language}`
  try {
    const res = await axios.get(url)
    return res.data
  } catch (err) {
    throw err
  }
}

export const getDetails = async (
  apiKey: string,
  itemId: string,
  category: 'movie' | 'tv'
) => {
  const url = `https://api.themoviedb.org/3/${category}/${itemId}?api_key=${apiKey}&append_to_response=videos`
  const res = await axios.get(url)
  if (res.status === 200) {
    return res.data
  }
  return null
}

export const getDetailsOfMovies = async (apiKey: string, itemIds: string[]) => {
  const results: ListItem[] = []
  try {
    await Promise.all(
      itemIds.map(async (itemId) => {
        const res = await getDetails(apiKey, itemId, 'movie')
        if (res)
          results.push({
            id: itemId,
            title: res.title,
            poster_path: res.poster_path,
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

export const getDetailsOfTV = async (apiKey: string, itemIds: string[]) => {
  const results: ListItem[] = []
  try {
    await Promise.all(
      itemIds.map(async (itemId) => {
        const res = await getDetails(apiKey, itemId, 'tv')
        if (res)
          results.push({
            id: itemId,
            title: res.name,
            poster_path: res.poster_path,
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
