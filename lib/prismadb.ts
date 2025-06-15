import { PrismaClient } from '@prisma/client/scripts/default-index.js'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
    var prismadb: PrismaClient | undefined;
}

const prisma = globalThis.prismadb || new PrismaClient().$extends(withAccelerate())

if(process.env.NODE_ENV !== "production") globalThis.prismadb = prisma;

export default prisma;