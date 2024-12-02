import { Router, Request, Response } from "express";
import { WordRepositoryImpl } from "../database/WordRepositoryImpl";
import { WordService } from "../../application/services/WordService";
import { EntriesController } from "../../application/controllers/EntriesController";
import { WordPrismaImplamantation } from "../database/prisma/implemantation/WordPrismaImplamantation";
import { EntryMiddleware } from "../middlewares/EntryMiddleware";
import { WordMiddleware } from "../middlewares/WordMiddleware";
import { FavoriteService } from "../../application/services/FavoriteService";
import { FavoriteRepositoryImpl } from "../database/FavoriteRepositoryImpl";
import { FavoritePrismaImplamantation } from "../database/prisma/implemantation/FavoritePrismaImplamantation";
import { HistoryRepositoryImpl } from "../database/HistoryRepositoryImpl";
const router = Router();

const wordRepository = new WordRepositoryImpl({
  getAllWordsFunction: WordPrismaImplamantation.getAll,
  getByTermFunction: WordPrismaImplamantation.getAllWithProps,
  getWordFunction: WordPrismaImplamantation.getWordByTerm,
  updateFunction: WordPrismaImplamantation.update
});
const favoriteRepository = new FavoriteRepositoryImpl({
  createFunciton: FavoritePrismaImplamantation.create
})

const historyRepository = new HistoryRepositoryImpl({
  createFunction: Hist
})

const wordService = new WordService(wordRepository);
const favoriteService = new FavoriteService(favoriteRepository)
const entryController = new EntriesController(wordService);

const entryMiddleware = new EntryMiddleware();
const wordMiddleware = new WordMiddleware(wordService, favoriteService);

router.get("/en", entryController.get_all_entries.bind(entryController));
router.get(
  "/en/:word",
  entryController.get_word_by_term.bind(entryController),
  wordMiddleware.saveViewHistoryMiddleware.bind(wordMiddleware),
  wordMiddleware.fetchWordDataMiddleware.bind(wordMiddleware)
);

router.post("/en/:word/favorite", (req: Request, res: Response) => {
  res.json({ message: "Entry word favorite Route" });
});
router.delete("/en/:word/favorite", (req: Request, res: Response) => {
  res.json({ message: "Delete favorite word Route" });
});
export default router;
