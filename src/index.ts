import dotenv from "dotenv";
import server from "./infrastruture/server";
import rootRouter from "./infrastruture/routes/RootRoutes";
import authRouter from "./infrastruture/routes/AuthRoutes";
import entriesRouter from "./infrastruture/routes/EntriesRoutes";
import userRouter from "./infrastruture/routes/UserRoutes";

dotenv.config();
const PORT = process.env.PORT;

server.use(rootRouter);
server.use("/auth", authRouter);
server.use("/entries", entriesRouter);
server.use("/user", userRouter);

server.listen(PORT, () => `Listen port ${PORT}`);