import { CreateFavoriteDto, Favorite } from "../../domain/entities/Favorite";
import { FavoriteRepository } from "../../domain/interfaces/FavoriteRepository";
import { prisma } from "./prisma/client";
const { favorite } = prisma
interface FavoriteRepositoryImplProps { 
  createFunciton: (data: CreateFavoriteDto) => Promise<Favorite>
}

export class FavoriteRepositoryImpl implements FavoriteRepository { 
  private createFunciton: (data: CreateFavoriteDto) => Promise<Favorite>
  constructor(props: FavoriteRepositoryImplProps) {
    this.createFunciton = props.createFunciton
  }

  async create(data: CreateFavoriteDto): Promise<Favorite> {
    const result = await this.createFunciton(data)
    return result
  }

}