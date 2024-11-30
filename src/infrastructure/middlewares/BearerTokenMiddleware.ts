import { Request, Response } from "express";
import { AuthResponseDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";
import { HttpResponse } from "../utils/HttpResponse";

export class BearerTokenMiddleware {
    constructor(private tokenGenerateFunction: (payload: any) => string) {}
    public successWithBearer(
        req: Request<{}, {}, {}, { }>, 
        res: Response<AuthResponseDto | null >): any {
        const { user } = req.user as CreateAuthWithUserResponseDto
        const { id, name  } = user
        const token = this.tokenGenerateFunction({ id, name })
        return HttpResponse.success(res, { id, name, token });
             
    }
}