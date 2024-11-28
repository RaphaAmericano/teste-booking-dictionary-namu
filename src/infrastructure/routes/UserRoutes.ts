import { Router, Request, Response } from 'express'
const router = Router()
router.get('/me', (req: Request, res: Response ) => {
    res.json({ message: "Users profile" })
})
router.get('/me/history', (req: Request, res: Response ) => {
    res.json({ message: "User history" })
})
router.get('/me/favorites', (req: Request, res: Response ) => {
    res.json({ message: "User Favorites" })
})


export default router