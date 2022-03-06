import NextAuth, { DefaultSession } from 'next-auth'
import type { Status } from '@prisma/client'
declare module 'next-auth' {
  interface User {
    id?: string
    username?: string
    name?: string | null
    email?: string | null
    status?: Status
  }
  interface Session {
    user: User
  }
}
