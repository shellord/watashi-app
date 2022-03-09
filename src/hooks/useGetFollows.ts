import { useQuery } from 'react-query'
import { fetchFollows } from '@/lib/client/follows'

export const useGetFollows = (id: string) => {
  return useQuery(['follows', id], () => fetchFollows(id))
}
