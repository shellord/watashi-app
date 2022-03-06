import { Gender, Status } from '@prisma/client'

export type User = {
  id?: string
  name?: string
  username?: string
  bio?: string
  gender?: Gender
  status?: Status
  image?: string
}
