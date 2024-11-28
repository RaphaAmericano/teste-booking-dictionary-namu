import dotenv from "dotenv";
import server from "./infrastructure/server";
import rootRouter from "./infrastructure/routes/RootRoutes";
import authRouter from "./infrastructure/routes/AuthRoutes";
import entriesRouter from "./infrastructure/routes/EntriesRoutes";
import userRouter from "./infrastructure/routes/UserRoutes";

dotenv.config();
const PORT = process.env.PORT;

server.use(rootRouter);
server.use("/auth", authRouter);
server.use("/entries", entriesRouter);
server.use("/user", userRouter);

server.listen(PORT, () => `Listen port ${PORT}`);