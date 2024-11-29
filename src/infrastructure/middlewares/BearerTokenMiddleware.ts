import { Request, Response } from "express";
import { AuthResponseDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";

export class BearerTokenMiddleware {
    
    constructor(private tokenGenerateFunction: (payload: any) => string) {}
    // TODO: escrever um construtor que recebe uma função de gerar token dando como resposta o tipo string
    public successWithBearer(
        req: Request<{}, {}, {}, { }>, 
        res: Response<AuthResponseDto | null >): any {
        const data = req.user as CreateAuthWithUserResponseDto
        const { user: { id, name} } = data
        const token = this.tokenGenerateFunction({ id, name })
        return res
            .status(201)
            .json({ id, name, token });                   
    }
}