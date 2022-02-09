import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SECRET!,
  pages: {
    signIn: '/signin',
    newUser: '/new-user',
  },

  callbacks: {
    async session({ session, user, token }) {
      session.user = { user }
      return session
    },
  },
  events: {
    createUser: async ({ user }) => {
      const { id } = user
      await prisma.user.update({
        where: { id },
        data: {
          username: Math.random().toString(36).substring(2, 7),
        },
      })
    },
  },
})
