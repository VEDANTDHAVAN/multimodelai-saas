import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

declare global {
    var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const createPrismaClient = () => new PrismaClient().$extends(withAccelerate());

const prismadb = globalThis.prisma || createPrismaClient();

if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;