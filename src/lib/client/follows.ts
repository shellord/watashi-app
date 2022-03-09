import axios from 'axios'

type Follows = {
  following: string[]
  followers: string[]
}

export const followUser = async (id: string) => {
  await axios.post('/api/follows', {
    id,
  })
}

export const fetchFollows = async (id: string) => {
  const follows = await axios.get<Follows>(`/api/follows/${id}`)
  return follows.data
}
