export type Gender = 'MALE' | 'FEMALE' | 'OTHER'

export type Status = 'ACTIVE' | 'BLOCKED'

export type User = {
  id?: string
  name?: string
  username?: string
  bio?: string
  gender?: Gender
  status?: Status
  image?: string
}
