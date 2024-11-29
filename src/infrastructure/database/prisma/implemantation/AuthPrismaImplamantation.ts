import {
  CreateAuthDto,
  CreateAuthWithUserDto,
} from "../../../../domain/entities/Auth";
import { prisma } from "../client";
const { auth } = prisma;

export class AuthPrismaImplementation {
  static async create(data: CreateAuthDto): Promise<any> {
    const { password, id } = data;
    const result = await auth.create({
      data: {
        password,
        user: {
          connect: { 
            id
          }
        },
      },
    });
    return result;
  }

  static async createWithUser(data: CreateAuthWithUserDto): Promise<any> {
    const { name, ...rest } = data;
    const result = await auth.create({
      data: {
        ...rest,
        user: {
          create: {
            name,
          },
        },
      },
    });
    return result;
  }
}
