import { Router, Request, Response } from 'express'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
const router = Router()
router.get('/', (req: Request, res: Response ) => {
    res.json({ message: "Fullstack Challenge 🏅 - Dictionary" })
})

const authMiddleware = new AuthMiddleware('jwt')

router.get('/jwt', authMiddleware.authenticate(), (req: Request, res: Response ) => {
    res.json({ message: "Fullstack Challenge 🏅 - Dictionary" })
})

export default router