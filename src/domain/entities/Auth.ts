import { User } from "./User";

export interface AuthId {
  id?: string;
}

export interface Auth extends AuthId {
  password: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAuthDto
  extends Pick<Auth, "password" | "email" | "id"> {}

export interface CreateAuthWithUserDto
  extends Pick<Auth, "password" | "email"> {
  name: string;
}

export interface CreateAuthWithUserResponseDto extends Auth {
  user_id: string;
  user: Omit<User, "id"> & { id: string };
}

export interface AuthResponseDto {
  id: string;
  name: string;
  token: string;
}