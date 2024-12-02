import { Request, Response } from "express";
import { HttpResponse } from "../utils/HttpResponse";
export class EntryMiddleware {
    constructor() {}

    public async saveFavorite(req: any, res: any, next: any) {
        console.log('Entry Middleware');
        next();
    }

    public async saveViewHistory(req: any, res: any, next: any) {
        console.log('Entry Middleware');
        next();
    }
}