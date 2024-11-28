import dotenv from 'dotenv'
import server from "./infrastruture/server";
import rootRouter from "./infrastruture/routes/RootRoutes";
dotenv.config()
const PORT = process.env.PORT;
server.use(rootRouter)
server.listen(3333, () => `Listen port ${PORT}`);
