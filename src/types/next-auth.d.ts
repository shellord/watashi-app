import NextAuth, { DefaultSession } from 'next-auth'
import type { Status } from '@/types/user'
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
