import { Request, Response } from "express";
import { AuthResponseDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";

export class BearerTokenMiddleware {
    constructor(private tokenGenerateFunction: (payload: any) => string) {}
    public successWithBearer(
        req: Request<{}, {}, {}, { }>, 
        res: Response<AuthResponseDto | null >): any {
        console.log(req.user)
        const { user } = req.user as CreateAuthWithUserResponseDto
        const { id, name  } = user
        const token = this.tokenGenerateFunction({ id, name })
        return res
            .status(201)
            .json({ id, name, token });                   
    }
}