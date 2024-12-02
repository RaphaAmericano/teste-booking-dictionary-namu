import { CreateFavoriteDto } from "../../domain/entities/Favorite";
import { FavoriteRepositoryImpl } from "../../infrastructure/database/FavoriteRepositoryImpl";

export class FavoriteService {
  
    constructor(private readonly favoriteRepository: FavoriteRepositoryImpl){}

    public async create(data: CreateFavoriteDto) {
      return this.favoriteRepository.create(data);
    }

    public async delete(id: string){
      return this.favoriteRepository.delete(id);
    }

    public async getWordOfUserId(user_id:string, word_id: string){
      return this.favoriteRepository.getWordOfUserId(user_id, word_id);
    }
}