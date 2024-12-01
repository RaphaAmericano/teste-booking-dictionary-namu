import { Router, Request, Response } from 'express'
import { WordRepositoryImpl } from '../database/WordRepositoryImpl'
import { WordService } from '../../application/services/WordService'
import { EntriesController } from '../../application/controllers/EntriesController'
import { WordPrismaImplamantation } from '../database/prisma/implemantation/WordPrismaImplamantation'
const router = Router()

const wordRepository = new WordRepositoryImpl({
    getAllWordsFunction: WordPrismaImplamantation.getAll,
    getByTermFunction: WordPrismaImplamantation.getAllWithProps,
    getWord: WordPrismaImplamantation.getWordByTerm
})

const wordService = new WordService(wordRepository)
const entryController = new EntriesController(wordService)

router.get('/en', entryController.get_all_entries.bind(entryController))
router.get('/en/:word', entryController.get_word_by_term.bind(entryController))

router.post('/en/:word/favorite', (req: Request, res: Response ) => {
    res.json({ message: "Entry word favorite Route" })
})
router.delete('/en/:word/favorite', (req: Request, res: Response ) => {
    res.json({ message: "Delete favorite word Route" })
})
export default router