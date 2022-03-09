import axios, { AxiosError } from 'axios'

export const followUser = async (id: string) => {
  await axios.post('/api/follow', {
    id,
  })
}
