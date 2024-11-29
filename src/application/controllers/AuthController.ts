import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { CreateAuthWithUserDto } from "../../domain/entities/Auth";
import { wrapPromise } from "../../shared/utils/PromiseHandle";


export class AuthController {
  constructor(
    private readonly authService: AuthService
    ) {}

  public async signup(req: Request<{}, {}, CreateAuthWithUserDto>, res: Response<{ message: string }>): Promise<any> {
    const { body } = req
    const { data, error } = await wrapPromise(this.authService.createWithUser(body))
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(201).json({ message: `User created funcionando namoral ${data}` });
  }

  public async signin(req: Request, res: Response): Promise<any> {
    return res.status(201).json({ message: "User created" });
  }
}
