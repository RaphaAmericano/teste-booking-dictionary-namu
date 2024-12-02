import { CreateFavoriteDto, Favorite } from "../../domain/entities/Favorite";
import { FavoriteRepository } from "../../domain/interfaces/FavoriteRepository";
import { prisma } from "./prisma/client";
interface FavoriteRepositoryImplProps { 
  createFunction: (data: CreateFavoriteDto) => Promise<Favorite>
  deleteFunction: (id: string) => Promise<Favorite>
  getWordOfUserIdFunction: (user_id: string, word: string) => Promise<Favorite>
}

export class FavoriteRepositoryImpl implements FavoriteRepository { 
  private createFunction: (data: CreateFavoriteDto) => Promise<Favorite>
  private deleteFunction: (id: string) => Promise<Favorite>
  private getWordOfUserIdFunction:(user_id: string, word_id: string) => Promise<Favorite>
  constructor(props: FavoriteRepositoryImplProps) {
    this.createFunction = props.createFunction
    this.deleteFunction = props.deleteFunction
    this.getWordOfUserIdFunction = props.getWordOfUserIdFunction
  }

  async create(data: CreateFavoriteDto): Promise<Favorite> {
    const result = await this.createFunction(data)
    return result
  }

  async delete(id:string): Promise<Favorite>{
    const result = await this.deleteFunction(id)
    return result
  }

  async getWordOfUserId(user_id: string, word_id: string): Promise<Favorite> {
    const result = await this.getWordOfUserIdFunction(user_id, word_id)
    return result
  }
}