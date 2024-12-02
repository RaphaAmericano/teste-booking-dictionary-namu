export interface UserId {
  id: string;
}
export interface User extends UserId {
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUserDto extends Pick<User, "name"> {
  auth_id: string;
}
