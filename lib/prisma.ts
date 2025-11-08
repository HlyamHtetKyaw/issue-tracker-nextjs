import { PrismaClient } from '../prisma/app/generated/prisma/client'  // Use the official Prisma client package

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export default prisma
