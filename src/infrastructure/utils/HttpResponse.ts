import { Response } from "express";

export class HttpResponse {
    static error(res:Response, message: string = "Error message" , status:number = 400){
        return res.status(status).json({ message })
    }

    static success(res:Response, body: object, status:number = 200){
        return res.status(status).json(body)
    }

    static successVoid(res:Response, status:number = 204){
        return res.status(status)
    }
}