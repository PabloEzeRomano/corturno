import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    barberId: string
    slug: string
    shopName: string
    user: {
      id: string
      name?: string | null
      email?: string | null
    }
  }

  interface JWT {
    barberId: string
    slug: string
    shopName: string
  }
}
