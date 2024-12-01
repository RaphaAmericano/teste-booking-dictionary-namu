export interface EntryId {
  id?: string;
}
export interface Entry extends EntryId {
  id?: string;
  user_id: string;
  word_id: string;
  added: Date;
  last_viewed: Date;
}