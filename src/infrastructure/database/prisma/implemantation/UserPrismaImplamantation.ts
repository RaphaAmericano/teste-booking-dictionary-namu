import { prisma } from "../client"
const { user } = prisma

export class UserPrismaImplementation {
    static async create(data: any): Promise<any> {
        const result = await user.create({
            data
        })
        return result
    }

    static async get_user_by_id(id: string): Promise<any> {
        const result = await user.findUnique({
            where: {
                id
            }
        })
        return result
    }

    static async get_user_profile_by_id(id: string): Promise<any> {
        const result = await user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                auth: {
                    select: {
                        email: true,
                        created_at: true,
                        updated_at: true
                    }
                }
            }
        })
        return result
    }

    static async get_user_history_by_id(id: string): Promise<any> {
        const result = await user.findUnique({
            where: {
                id
            },
            select: {
                history: {
                    select: {
                        created_at: true,
                        word: {
                            select: {
                                word: true,
                            }
                        }
                    }
                }
            }
        })
        return result
    }

    static async get_user_favorite_by_id(id: string): Promise<any> {
        const result = await user.findUnique({
            where: {
                id
            },
            select: {
                favorite: {
                    select: {
                        created_at: true,
                        word: {
                            select: {
                                word: true,
                            }
                        }
                    }
                }
            }
        })
        return result
    }   

}