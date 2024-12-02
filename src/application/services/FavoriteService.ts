import { CreateFavoriteDto } from "../../domain/entities/Favorite";
import { FavoriteRepositoryImpl } from "../../infrastructure/database/FavoriteRepositoryImpl";

export class FavoriteService {
  
    constructor(private readonly favoriteRepository: FavoriteRepositoryImpl){}

    public async create(data: CreateFavoriteDto) {
      return this.favoriteRepository.create(data);
    }
}