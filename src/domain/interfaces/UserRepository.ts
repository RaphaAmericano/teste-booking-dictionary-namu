import { CreateUserDto, User } from "../entities/User";

export interface UserRepository {
    create(user: CreateUserDto): Promise<User> 
    get_user_profile(id: string): Promise<User>
    get_user_history(id: string): Promise<User>
    get_user_favorites(id: string): Promise<User>
}