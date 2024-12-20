import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";
import { User } from "../../domain/entities/User";
import { WordService } from "../services/WordService";
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
            HttpResponse.error(res, "Error when searching for user");
            return
        }
        HttpResponse.success(res, data)
        return
    }

    public async get_user_history(
        req:Request<{}, {}, {}, { limit?: number, page?:number }>,
        res: Response,
        next:NextFunction
    ){
        const { query } = req
        const { id } = req.user as User
        const { limit = 20, page = 1  } = query
        const skip =  (page - 1) * limit

        const { data, error } = await PromiseHandle.wrapPromise(
            this.userService.get_user_history(id, Number(limit), skip)
        )
        if (error) {
            HttpResponse.error(res, "Error when searching history");
            return
        }
        const { result: { history  }, totalDocs } = data

        const results = WordService.formatWordToResponse(history)

        const totalPages = Math.ceil(totalDocs / limit )
        const hasNext = page < totalDocs
        const hasPrev = page > 1 

        HttpResponse.success(res, { results, totalDocs, page, totalPages, hasNext, hasPrev })
        return
    }

    public async get_user_favorites(
        req:Request<{}, {}, {}, { limit?: number, page?:number }>,
        res: Response,
        next:NextFunction
    ){
        const { query } = req
        const { id } = req.user as User
        const { limit = 20, page = 1  } = query
        const skip =  (page - 1) * limit

        const { data, error } = await PromiseHandle.wrapPromise(
            this.userService.get_user_favorites(id, Number(limit), skip)
        )
        if (error) {
            HttpResponse.error(res, "Error when searching favorites");
            return
        }
        const { result: { favorite  }, totalDocs } = data

        const results = WordService.formatWordToResponse(favorite)

        const totalPages = Math.ceil(totalDocs / limit )
        const hasNext = page < totalDocs
        const hasPrev = page > 1 

        HttpResponse.success(res, { results, totalDocs, page, totalPages, hasNext, hasPrev })
        return
    }

}