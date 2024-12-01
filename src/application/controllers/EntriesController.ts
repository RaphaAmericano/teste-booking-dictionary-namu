import { NextFunction, Request, Response } from "express";
import { WordService } from "../services/WordService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { HttpResponse } from "../../infrastructure/utils/HttpResponse";

export class EntriesController {
  constructor(
    // private readonly entryService: EntryService,
    private readonly wordService: WordService
  ) {}

  public async get_all_entries( req: Request<{}, {}, {}, { search: string, limit?: number, page?:number }>, res: Response, next: NextFunction ): Promise<void>  {
    // TODO: Pagination
    const { query } = req
    const { search, limit = 20, page = 1  } = query
    const skip =  (page - 1) * limit
    const { data, error } = await PromiseHandle.wrapPromise(this.wordService.getAllWords(search, Number(limit), skip))

    if (error) {
      HttpResponse.error(res);
      return 
    } 
    const { totalDocs } = data
    const totalPages = Math.ceil(totalDocs / limit )
    const hasNext = page < totalDocs
    const hasPrev = page > 1 
    HttpResponse.success(res, { ...data, page, totalPages, hasNext, hasPrev });
    return 
  }

}
