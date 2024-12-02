import { Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { WordService } from "../../application/services/WordService";
import { DictionaryApiService } from "../../application/services/DictionaryApiService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { Word } from "../../domain/entities/Word";
import { FavoriteService } from "../../application/services/FavoriteService";
import { HistoryService } from "../../application/services/HistoryService";
import { RedisService } from "../cache/RedisCache";


export class WordMiddleware {
    constructor(
        private readonly wordService: WordService, 
        private readonly favoriteService: FavoriteService,
        private readonly historyService: HistoryService,
        private readonly cacheService: RedisService 
    ) {}

    public async fetchWordDataMiddleware(req: Request, res: Response<{ locals: { word: Word }}>, next: any): Promise<void> {
        const { word } = res.locals
        const { origin, phonetic, word:word_text } = word



        if(!origin || !phonetic) {

            // TODO: realizar a checagem no cache e procedimento


            const { data, error } = await PromiseHandle.wrapPromise(DictionaryApiService.getWord(word_text))
            console.log(data)

            if(data){
                const reduce_data =  DictionaryApiService.reduceResponseArray(data)
                // const { data:data_update, error:error_update } = await PromiseHandle.wrapPromise(this.wordService.update(id, reduce_data))
                // console.log(data_update)
                res.locals.word = {...word, ...data}
                HttpResponse.success(res, { ...word, ...reduce_data })
                // next()
                return 
            }
        }

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