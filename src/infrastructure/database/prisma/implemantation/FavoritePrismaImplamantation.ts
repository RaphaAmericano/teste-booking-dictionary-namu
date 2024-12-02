import {
  CreateFavoriteDto,
  Favorite,
} from "../../../../domain/entities/Favorite";
import { prisma } from "../client";
const { favorite } = prisma;

export class FavoritePrismaImplamantation {
  static async create(data: CreateFavoriteDto): Promise<Favorite> {
    const result = await favorite.create({
      data,
    });
    return result;
  }

  static async delete(id: string): Promise<Favorite> {
    const result = await favorite.delete({
      where: {
        id,
      },
    });
    return result
  }

  static async getWordOfUserId(user_id: string, word_id: string): Promise<Favorite> {
    const result = await favorite.findFirst({
      where: {
        user_id,
        word_id
      },
    });
    return result as Favorite;
  }
}
