import axios from 'axios'

export const followUser = async (id: string) => {
  await axios.post('/api/follows', {
    id,
  })
}

export const fetchFollows = async (id: string) => {
  await axios.get(`/api/follows/${id}`)
}
