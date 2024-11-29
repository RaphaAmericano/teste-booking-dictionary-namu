import { Auth, CreateAuthDto, CreateAuthWithUserDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";
import { AuthRepositoryImpl } from "../../infrastructure/database/AuthRepositoryImpl";

export class AuthService {
    constructor(private readonly authRepository: AuthRepositoryImpl) {}

    public create(auth: CreateAuthDto): Promise<Auth> {
        return this.authRepository.create(auth);
    }

    public createWithUser(auth: CreateAuthWithUserDto): Promise<CreateAuthWithUserResponseDto> {
        return this.authRepository.createWithUser(auth)
    }

}