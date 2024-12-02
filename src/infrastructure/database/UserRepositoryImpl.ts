import { CreateUserDto, User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";
interface UserRepositoryImplProps{
    createFunction: (user: CreateUserDto) => Promise<User>
    getUserProfileFunction:(id:string) => Promise<User>
    getUserFavoritesFunction:(id:string) => Promise<User>
    getUserHistoryFunction:(id:string) => Promise<User>
}

export class UserRepositoryImpl implements UserRepository {
    private createFunction:  (user: CreateUserDto) => Promise<User>
    private getUserProfileFunction:(id:string) => Promise<User>
    private getUserFavoritesFunction:(id:string) => Promise<User>
    private getUserHistoryFunction:(id:string) => Promise<User>
    constructor(props:UserRepositoryImplProps) {
        this.createFunction = props.createFunction;
        this.getUserProfileFunction = props.getUserProfileFunction;
        this.getUserFavoritesFunction = props.getUserFavoritesFunction;
        this.getUserHistoryFunction = props.getUserHistoryFunction;
    }
    async create(user: CreateUserDto): Promise<User> {
        const result = await this.createFunction(user);
        return result;
    }

    async get_user_profile(id: string): Promise<User> {
        const result = await this.getUserProfileFunction(id);
        return result
    }

    async get_user_favorites(id: string): Promise<User> {
        const result = await this.getUserFavoritesFunction(id);
        return result
    }

    async get_user_history(id: string): Promise<User> {
        const result = await this.getUserHistoryFunction(id);
        return result
    }


}