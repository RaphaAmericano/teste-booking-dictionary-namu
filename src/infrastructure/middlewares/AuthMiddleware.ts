import { NextFunction, Request, Response, } from "express";
import passport, { AuthenticateOptions } from "passport";

export class AuthMiddleware {
    private readonly strategyName: string
    private readonly options: AuthenticateOptions 
    constructor(strategyName: string, options?:AuthenticateOptions) {
        this.strategyName = strategyName;
        this.options = options ?? { session: false }
    }

    public authenticate() {
        return (req: Request, res: Response, next: NextFunction): void => {
            passport.authenticate(this.strategyName, this.options, (err: any | Error, user: any, info: any | { message: string }) => {
                if(err){
                    return res.status(401).json({ message: "Unauthorized", error: err.message });
                }
                if(!user){
                    return res.status(401).json({ message: "Unauthorized", error: info.message });
                }
                req.user = user
            })(req,res, next);

        }
    }

}