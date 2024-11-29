import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { Auth, CreateAuthWithUserDto } from "../../domain/entities/Auth";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";

export class AuthController {
  constructor(private readonly authService: AuthService) {
    if (!authService) {
      throw new Error("AuthService is required");
    }
  }

  public async signup(
    req: Request<{}, {}, CreateAuthWithUserDto>,
    res: Response<{ message: string }>
  ): Promise<any> {
    const { body } = req;
    const { data, error } = await PromiseHandle.wrapPromise<unknown>(
      this.authService.createWithUser(body)
    );
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(201)
      .json({ message: `User created funcionando namoral ${data}` });
  }

  public async signin(req: Request, res: Response): Promise<any> {
    return res.status(201).json({ message: "User created" });
  }
}
