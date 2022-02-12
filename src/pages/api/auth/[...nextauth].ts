import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { generateAvatar } from '@/lib/avatar'

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
      session.user = user
      return session
    },
  },
  events: {
    createUser: async ({ user }) => {
      const { id, name } = user
      const image = generateAvatar(name as string)
      const prefix = name?.split(' ')[0]
      const suffix = Math.random().toString().substring(2, 4)
      const random_username = prefix + suffix
      await prisma.user.update({
        where: { id },
        data: {
          username: random_username,
          image,
        },
      })
    },
  },
})
