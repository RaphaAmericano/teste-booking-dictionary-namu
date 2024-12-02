import { Response } from "express";
import { RequestUtils } from "./RequestUtils";

export class HttpResponse {
    public static error(res:Response, message: string = "Error message" , status:number = 400): Response{
        return res.status(status).json({ message })
    }

    public static success(res:Response, body: object, status:number = 200): Response{
        return res.status(status).json(body)
    }

    public static successVoid(res:Response, status:number = 204): Response{
        return res.status(status)
    }

    public static setResponseTimeHeader(res:Response, start: [number, number]): void {
        const durationInMilliseconds = RequestUtils.get_request_end_time(start)
        res.set('x-response-time', `${durationInMilliseconds}ms`)
        
    }

}