import { CreateUserDto, User } from "../../domain/entities/User";
import { UserRepositoryImpl } from "../../infrastructure/database/UserRepositoryImpl";

export class UserService {
    constructor(private readonly userRepository: UserRepositoryImpl){}
    public create(user: CreateUserDto): Promise<User> {
        return this.userRepository.create(user);
    }
}