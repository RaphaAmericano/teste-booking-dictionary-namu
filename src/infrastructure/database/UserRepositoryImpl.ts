import { CreateUserDto, User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
interface UserRepositoryImplProps{
    createFunction: (user: CreateUserDto) => Promise<User>
}

export class UserRepositoryImpl implements UserRepository {
    private createFunction:  (user: CreateUserDto) => Promise<User>
    constructor(props:UserRepositoryImplProps) {
        this.createFunction = props.createFunction;
    }
    async create(user: CreateUserDto): Promise<User> {
        const result = await this.createFunction(user);
        return user;
    }
}