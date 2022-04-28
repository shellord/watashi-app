import axios from 'axios'

export const connectSpotify = async (
  clientId: string,
  clientSecret: string
) => {
  const getAccessToken = async () => {
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

  let accessToken = await getAccessToken()

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
  return {
    searchMusic,
  }
}
