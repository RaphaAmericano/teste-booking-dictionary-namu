import dotenv from "dotenv";
import server from "./infrastructure/server";
dotenv.config();
const PORT = process.env.PORT;
server.listen(PORT, () => `Listen port ${PORT}`);