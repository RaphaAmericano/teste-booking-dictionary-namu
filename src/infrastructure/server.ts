import express, { NextFunction, Request, Response }  from "express"
import { PassportConfig } from "./config/PassportConfig";
import { JwtStrategyService } from "./strategies/JwtStrategy";
import { LocalStrategyService } from "./strategies/LocalStrategy";
import { AuthPrismaImplementation } from "./database/prisma/implemantation/AuthPrismaImplamantation";
import rootRouter from "./routes/RootRoutes";
import authRouter from "./routes/AuthRoutes";
import entryRouter from "./routes/EntryRoutes";
import userRouter from "./routes/UserRoutes";
import { RequestTreatmentMiddleware } from "./middlewares/RequestTreatmentMiddleware";

PassportConfig.configure('jwt', JwtStrategyService.getStrategy())
PassportConfig.configure('local', new LocalStrategyService(AuthPrismaImplementation.findByEmail).getStategy())

const server = express()
// TODO: cors
server.use(express.json({
    strict: true,
    verify: RequestTreatmentMiddleware.verifyRequest
}))

server.use(rootRouter);
server.use("/auth", authRouter);
server.use("/entries", entryRouter);
server.use("/user", userRouter);

server.use((error:Error | any, req:Request, res:Response, next:NextFunction) => {
    RequestTreatmentMiddleware.filterJsonInvalidRequest(error, req, res, next)
})

export default server
