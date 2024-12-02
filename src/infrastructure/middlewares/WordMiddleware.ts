import { Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
import { WordService } from "../../application/services/WordService";
import { DictionaryApiService } from "../../application/services/DictionaryApiService";
import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { Word } from "../../domain/entities/Word";


export class WordMiddleware {
    constructor(
        private readonly wordService: WordService, 
    ) {}

    public async fetchWordDataMiddleware(req: Request, res: Response<{ locals: { word: Word }}>, next: any): Promise<void> {
        const { word } = res.locals
        const { origin, phonetic, word:word_text, id } = word
        if(!origin || !phonetic) {
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

    public async saveViewHistory(req: any, res: any, next: any) {
        console.log('Entry Middleware');
        next();
    }
}