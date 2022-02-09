import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id?: string | undefined
    username?: string | null | undefined
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
    status?: 'PENDING' | 'ACTIVE' | 'BLOCKED'
  }
  interface Session {
    user: User
  }
}
