import { NextFunction, Request, Response } from "express";
import { WordService } from "../services/WordService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";
import { FavoriteService } from "../services/FavoriteService";
import { User } from "../../domain/entities/User";

export class EntriesController {
  constructor(
    // private readonly entryService: EntryService,
    private readonly wordService: WordService,
    private readonly favoriteService: FavoriteService
  ) {}

  public async get_all_entries( req: Request<{}, {}, {}, { search: string, limit?: number, page?:number }>, res: Response, next: NextFunction ): Promise<void>  {
    // TODO: Pagination
    const { query } = req
    const { search, limit = 20, page = 1  } = query
    const skip =  (page - 1) * limit
    const { data, error } = await PromiseHandle.wrapPromise(this.wordService.getAllWords(search, Number(limit), skip))

    if (error) {
      HttpResponse.error(res, "Error when search words");
      return 
    } 
    const { totalDocs } = data
    const totalPages = Math.ceil(totalDocs / limit )
    const hasNext = page < totalDocs
    const hasPrev = page > 1 
    HttpResponse.success(res, { ...data, page, totalPages, hasNext, hasPrev });
    return 
  }

  public async get_word_by_term(req: Request<{ word: string }, {}, {}, {}>, res: Response, next: NextFunction) : Promise<void> {
    const { word } = req.params
    const { data, error  } = await PromiseHandle.wrapPromise(this.wordService.getWord(word))
    if (error) {
      HttpResponse.error(res, "Error when search words");
      return 
    } 
    res.locals.word = data
    next()
    return 
  }

  public async post_favorite(req: Request<{ word: string }, {}, {}, {}>, res: Response, next: NextFunction) : Promise<void> {
    const { user, params } = req;
    const { id } = user as User;
    const { word } = params;
    const { data:data_word, error:error_word } = await PromiseHandle.wrapPromise(this.wordService.getWord(word))
    if (error_word) {
      HttpResponse.error(res, "Error when save favorite");
      return 
    } 

    const { data:data_favorite, error:error_favorite } = await PromiseHandle.wrapPromise(this.favoriteService.create({ user_id: id, word_id: data_word.id  }))
    if (error_favorite) {
      HttpResponse.error(res, "Error when save favorite");
      return 
    } 
    HttpResponse.success(res, data_favorite)
    return 

  }

  public async delete_favorite(req: Request<{ word: string }, {}, {}, {}>, res: Response, next: NextFunction) : Promise<void> {
    const { user, params } = req;
    const { id } = user as User;
    const { word } = params;
    const { data:data_word, error:error_word } = await PromiseHandle.wrapPromise(this.wordService.getWord(word))
    if (error_word) {
      HttpResponse.error(res, "Error when delete favorite");
      return 
    } 
    const { data:data_favorite, error:error_favorite } = await PromiseHandle.wrapPromise(this.favoriteService.getWordOfUserId(id, data_word.id))
    if (error_favorite) {
      HttpResponse.error(res, "Error when save favorite");
      return 
    }
    const { data:delete_result, error:error_delete } = await PromiseHandle.wrapPromise(this.favoriteService.delete(data_favorite.id))
    
    if (error_delete) {
      HttpResponse.error(res, "Error when save favorite");
      return
    }
    HttpResponse.success(res, delete_result)
    return 
    // procurar o termo entre os favoritados do usuario
  }

}
