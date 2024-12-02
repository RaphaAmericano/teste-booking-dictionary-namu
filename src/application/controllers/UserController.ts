import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";
import { User } from "../../domain/entities/User";
export class UserController {
    constructor(private readonly userService: UserService){}

    public async get_user(
       req:Request,
       res: Response,
       next:NextFunction
    ): Promise<void>{
        const { id } = req.user as User
        const { data, error } = await PromiseHandle.wrapPromise(
            this.userService.get_user_profile(id)
        )
        if (error) {
            HttpResponse.error(res);
            return
        }
        HttpResponse.success(res, data)
        return
    }

    public async get_user_history(
        req:Request,
        res: Response,
        next:NextFunction
    ){
        const { id } = req.user as User
        const { data, error } = await PromiseHandle.wrapPromise(
            this.userService.get_user_history(id)
        )
        if (error) {
            HttpResponse.error(res);
            return
        }
        HttpResponse.success(res, data)
        return
    }

    public async get_user_favorites(
        req:Request,
        res: Response,
        next:NextFunction
    ){
        const { id } = req.user as User
        const { data, error } = await PromiseHandle.wrapPromise(
            this.userService.get_user_favorites(id)
        )
        if (error) {
            HttpResponse.error(res);
            return
        }
        HttpResponse.success(res, data)
        return
    }

}