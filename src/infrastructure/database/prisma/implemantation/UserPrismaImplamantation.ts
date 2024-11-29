import { prisma } from "../client"
const { user } = prisma

export class UserPrismaImplementation {
    async create(data: any): Promise<any> {
        const result = await user.create({
            data
        })
        return result
    }
}