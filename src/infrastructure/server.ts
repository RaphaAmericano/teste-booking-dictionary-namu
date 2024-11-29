import express from "express"
import { PassportConfig } from "./config/PassportConfig";
import { JwtStrategyService } from "./strategies/JwtStrategy";
import rootRouter from "./routes/RootRoutes";
import authRouter from "./routes/AuthRoutes";
import entriesRouter from "./routes/EntriesRoutes";
import userRouter from "./routes/UserRoutes";

PassportConfig.configure('jwt', JwtStrategyService.getStrategy())

const server = express()
server.use(express.json())

server.use(rootRouter);
server.use("/auth", authRouter);
server.use("/entries", entriesRouter);
server.use("/user", userRouter);

export default server
