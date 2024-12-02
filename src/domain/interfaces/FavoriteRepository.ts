import { CreateFavoriteDto, Favorite } from "../entities/Favorite";

export interface FavoriteRepository {
    create(data:CreateFavoriteDto): Promise<Favorite>;
}