export interface FavoriteId {
  id: string;
}
export interface Favorite extends FavoriteId {
  word_id: string;
  user_id: string;
}
export interface CreateFavoriteDto extends Omit<Favorite, "id"> {}
