import { Router, Request, Response } from 'express'
const router = Router()
router.get('/en', (req: Request, res: Response ) => {
    res.json({ message: "Entry  Route" })
})
router.get('/en/:word', (req: Request, res: Response ) => {
    res.json({ message: "Entry word Route" })
})
router.post('/en/:word/favorite', (req: Request, res: Response ) => {
    res.json({ message: "Entry word favorite Route" })
})
router.delete('/en/:word/favorite', (req: Request, res: Response ) => {
    res.json({ message: "Delete favorite word Route" })
})
export default router