import { Response } from "express";

export class HttpResponse {
    static error(res:Response, message: string = "Error message" , status:number = 400): Response{
        return res.status(status).json({ message })
    }

    static success(res:Response, body: object, status:number = 200): Response{
        return res.status(status).json(body)
    }

    static successVoid(res:Response, status:number = 204): Response{
        return res.status(status)
    }
}