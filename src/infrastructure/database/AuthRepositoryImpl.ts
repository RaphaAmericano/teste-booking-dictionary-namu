import { Auth, CreateAuthDto, CreateAuthWithUserDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";
import { AuthRepository } from "../../domain/interfaces/AuthRepository";

interface AuthRepositoryImplProps{
    createFunction: (auth: CreateAuthDto) => Promise<Auth>,
    createWithUserFunction: (auth:CreateAuthWithUserDto) => Promise<CreateAuthWithUserResponseDto>
}

export class AuthRepositoryImpl implements AuthRepository {
    private readonly createFunction: (auth: CreateAuthDto) => Promise<Auth>
    private readonly createWithUserFunction: (auth: CreateAuthWithUserDto) => Promise<CreateAuthWithUserResponseDto>
    
    constructor( props: AuthRepositoryImplProps ) {
        this.createFunction = props.createFunction as (auth: CreateAuthDto) => Promise<Auth>;
        this.createWithUserFunction = props.createWithUserFunction as (auth: CreateAuthDto) => Promise<CreateAuthWithUserResponseDto>;
    }
    async create(user: CreateAuthDto): Promise<Auth> {
        const result = await this.createFunction(user);
        return result;
    }

    async createWithUser(user: CreateAuthWithUserDto): Promise<CreateAuthWithUserResponseDto> {
        const result = await this.createWithUserFunction(user);
        return result;
    }
}