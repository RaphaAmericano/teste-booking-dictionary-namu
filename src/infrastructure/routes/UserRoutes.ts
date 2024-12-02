import { Router, Request, Response } from 'express'
import { UserRepositoryImpl } from '../database/UserRepositoryImpl'
import { UserPrismaImplementation } from '../database/prisma/implemantation/UserPrismaImplamantation'
import { UserController } from '../../application/controllers/UserController'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { UserService } from '../../application/services/UserService'
const router = Router()

const userRepository = new UserRepositoryImpl({
    createFunction: UserPrismaImplementation.create,
    getUserProfileFunction: UserPrismaImplementation.get_user_profile_by_id,
    getUserHistoryFunction:UserPrismaImplementation.get_user_history_by_id,
    getUserFavoritesFunction: UserPrismaImplementation.get_user_favorite_by_id
})
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const authMiddleware = new AuthMiddleware('jwt');

router.get('/me', authMiddleware.authenticate(), userController.get_user.bind(userController))
router.get('/me/history', authMiddleware.authenticate(), userController.get_user_history.bind(userController))
router.get('/me/favorites', authMiddleware.authenticate(), userController.get_user_favorites.bind(userController))

export default router