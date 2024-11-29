import { Router } from "express";
import { AuthRepositoryImpl } from "../database/AuthRepositoryImpl";
import { AuthService } from "../../application/services/AuthService";
import { AuthController } from "../../application/controllers/AuthController";
import { AuthPrismaImplementation } from "../database/prisma/implemantation/AuthPrismaImplamantation";
const router = Router();

const authRepository = new AuthRepositoryImpl({
  createFunction:AuthPrismaImplementation.create,
  createWithUserFunction: AuthPrismaImplementation.createWithUser
});
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/signup", authController.signup.bind(authController));
router.post("/signin", authController.signin.bind(authController));
export default router;
