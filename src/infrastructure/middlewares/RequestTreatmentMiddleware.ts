import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";

export class RequestTreatmentMiddleware {
  public static verifyRequest(
    req: Request,
    res: Response,
    buffer: Buffer,
    encoding: BufferEncoding  
) {
    try {
      JSON.parse(buffer.toString(encoding || "utf-8"));    } catch (error) {
      throw new SyntaxError("Invalid JSON payload");
    }
  }

  public static filterJsonInvalidRequest(  error: any, req: Request, res: Response, next:NextFunction  ){
      if(error instanceof SyntaxError && error.message.includes("JSON")){
          return HttpResponse.error(res)
      }
      next(error)
  }

}
