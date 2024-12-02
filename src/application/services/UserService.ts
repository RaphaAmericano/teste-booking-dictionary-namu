import { CreateUserDto, User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryImpl){}
    public create(user: CreateUserDto): Promise<User> {
        return this.userRepository.create(user);
    }

    public get_user_profile(id: string): Promise<User> {
        return this.userRepository.get_user_profile(id);
    }

    public get_user_history(id: string): Promise<User> {
        return this.userRepository.get_user_history(id);
    }

    public get_user_favorites(id: string): Promise<User> {
        return this.userRepository.get_user_favorites(id);
    }
}