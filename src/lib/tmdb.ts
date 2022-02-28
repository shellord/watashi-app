import axios from 'axios'

export const tmdb = async (
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
