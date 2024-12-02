import { prisma } from "../client"
const { user, favorite, history } = prisma

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

    static async get_user_history_by_id(id: string, limit: number = 10, skip: number = 0): Promise<any> {
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
                    },
                    skip,
                    take: limit,
                    orderBy:{
                        created_at: "desc"
                    }
                }
            }
        })

        const totalDocs = await await history.count({
            where: {
                user_id: id
            }
        })

        return { result, totalDocs }
    }

    static async get_user_favorite_by_id(id: string, limit: number = 10, skip: number = 0): Promise<any> {

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
                    },
                    skip,
                    take: limit,
                    orderBy:{
                        created_at: "desc"
                    }
                }
            }
        })

        const totalDocs = await await favorite.count({
            where: {
                user_id: id
            }
        })

        return { result, totalDocs }
    }   

}