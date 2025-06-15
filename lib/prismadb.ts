import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

/*declare global {
    var prisma: PrismaClient | undefined;
}*/

const prismadb = new PrismaClient().$extends(withAccelerate()) //globalThis.prisma || 

//if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;