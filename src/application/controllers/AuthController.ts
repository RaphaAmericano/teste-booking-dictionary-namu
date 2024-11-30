import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { CreateAuthWithUserDto, CreateAuthWithUserResponseDto } from "../../domain/entities/Auth";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    if (!authService) {
      throw new Error("AuthService is required");
    }
  }

  public async signup(
    req: Request<{}, {}, CreateAuthWithUserDto>,
    res: Response<{ message: string, data?: CreateAuthWithUserResponseDto | null }>,
    next: NextFunction
  ): Promise<any> {
    const { body } = req;
    const { data, error } = await PromiseHandle.wrapPromise<CreateAuthWithUserResponseDto>(
      this.authService.createWithUser(body)
    );
    console.log(data)
    if (error) {
      return HttpResponse.error(res);
    }

    req.user = { ...data }
    return next()
  }

  public async signin(req: Request, res: Response, next: NextFunction): Promise<any> {
    return next()
  }
}
