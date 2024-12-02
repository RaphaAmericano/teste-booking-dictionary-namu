import { Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { WordService } from "../../application/services/WordService";
import { DictionaryApiService } from "../../application/services/DictionaryApiService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { Word } from "../../domain/entities/Word";
import { FavoriteService } from "../../application/services/FavoriteService";
import { HistoryService } from "../../application/services/HistoryService";
import { CacheService } from "../../application/services/CacheService";
import { RequestUtils } from "../utils/RequestUtils";


export class WordMiddleware {
    constructor(
        private readonly wordService: WordService, 
        private readonly favoriteService: FavoriteService,
        private readonly historyService: HistoryService,
        private readonly cacheService: CacheService 
    ) {}

    public async fetchWordDataMiddleware(req: Request, res: Response<{ locals: { word: Word, start: [number, number] }}>, next: any): Promise<void> {

        const { word, start } = res.locals
        const { word:word_text } = word

        const cache = await this.cacheService.get(`word:${word.word}`)
        console.log(cache)
        if(cache){
            // TODO: adicionar os headers
            res.setHeader('x-cache', 'HIT')
            res.setHeader('x-response-time', `${RequestUtils.get_request_end_time(start)}ms`)
            HttpResponse.success(res, { ...word, ...cache })
            next();
            return
        }
        
        const { data, error } = await PromiseHandle.wrapPromise(DictionaryApiService.getWord(word_text))
        if(data){
            const reduce_data =  DictionaryApiService.reduceResponseArray(data)
            await this.cacheService.set(`word:${word.word}`, reduce_data)
            // console.log(reduce_data)
            const { data:data_update, error:error_update } = await PromiseHandle.wrapPromise(this.wordService.update(word.id, reduce_data))
            // console.log("update:",data_update)
            res.locals.word = {...word, ...data}
            res.setHeader('x-response-time', `${RequestUtils.get_request_end_time(start)}ms`)
            HttpResponse.success(res, { ...word, ...reduce_data })
            return 
        }
        
        res.setHeader('x-response-time', `${RequestUtils.get_request_end_time(start)}ms`)
        HttpResponse.success(res, { ...word })
        next();
        return
    }

    public async saveViewHistoryMiddleware(req: any, res: Response<{ locals: { word: Word }}>, next: any) {
        
        const { user } = req
        const { word: { id } } = res.locals
        console.log(id)
        const { data, error } = await PromiseHandle.wrapPromise(this.historyService.create({user_id: user.id, word_id: id}))

        if(error) {
            HttpResponse.error(res, error)
            return
        }
        next()
        return 
    }

}