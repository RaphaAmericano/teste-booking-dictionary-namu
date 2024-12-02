import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";

export class ResponseTreatmentMiddleware {
  public static setResponseTime( req: Request, res: Response, next:NextFunction ) {
    const start = process.hrtime()
    res.locals.start = start 
    res.setHeader('x-cache', 'MISS')

    // res.on('finish', () => {
    //   const [seconds, nanoseconds] = process.hrtime(start)
    //   const durationInMilliseconds = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2)
  
    // })
    
    next()
  }

}
