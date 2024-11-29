import express from "express"
import rootRouter from "./routes/RootRoutes";
import authRouter from "./routes/AuthRoutes";
import entriesRouter from "./routes/EntriesRoutes";
import userRouter from "./routes/UserRoutes";
const server = express()
server.use(express.json())

server.use(rootRouter);
server.use("/auth", authRouter);
server.use("/entries", entriesRouter);
server.use("/user", userRouter);

export default server
