import { ListItem } from '@/types/list'
import axios, { AxiosError } from 'axios'

const getAccessToken = async (clientId: string, clientSecret: String) => {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    null,
    {
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
      },
    }
  )
  return response.data.access_token
}

export const connectSpotify = async (
  clientId: string,
  clientSecret: string
) => {
  let accessToken = await getAccessToken(clientId, clientSecret)

  const searchMusic = async (query: string) => {
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      params: {
        q: query,
        type: 'track',
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  }

  const getDetailsOfMusics = async (itemIds: string[]) => {
    const results: ListItem[] = []
    try {
      await Promise.all(
        itemIds.map(async (itemId) => {
          const res = await getDetails(itemId)
          if (res)
            results.push({
              id: itemId,
              title: res.name,
              poster_path: res.album.images[1].url,
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

  const getDetails = async (itemId: string) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.data
  }

  return {
    searchMusic,
    getDetailsOfMusics,
    getDetails,
  }
}
