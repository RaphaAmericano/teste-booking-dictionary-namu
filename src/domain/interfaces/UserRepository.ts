import { CreateUserDto, User } from "../entities/User";

export interface UserRepository {
    create(user: CreateUserDto): Promise<User> 
}