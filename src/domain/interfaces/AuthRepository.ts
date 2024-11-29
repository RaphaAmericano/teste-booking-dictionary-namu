import { Auth, CreateAuthDto } from "../entities/Auth";

export interface AuthRepository {
    create(auth_user:CreateAuthDto ): Promise<Auth>
    // login(email: string, password: string): Promise<User>
}