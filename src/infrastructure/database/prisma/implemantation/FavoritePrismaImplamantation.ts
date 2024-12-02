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
}
