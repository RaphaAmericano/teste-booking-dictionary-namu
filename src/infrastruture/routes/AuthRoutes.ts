import { Router, Request, Response } from 'express'
const router = Router()
router.post('/signup', (req: Request, res: Response ) => {
    res.json({ message: "Auth Signup Route" })
})
router.post('/signin', (req: Request, res: Response ) => {
    res.json({ message: "Auth Signin Route" })
})
export default router