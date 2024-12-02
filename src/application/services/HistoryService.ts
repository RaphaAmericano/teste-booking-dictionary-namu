import { HistoryRepositoryImpl } from "../../infrastructure/database/HistoryRepositoryImpl";

export class HistoryService {
    constructor(private readonly historyRepository: HistoryRepositoryImpl){}

    public async create(data: CreateHistoryDto) {
        return this.historyRepository.create(data);
    }
}