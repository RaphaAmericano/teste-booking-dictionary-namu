import { CreateHistoryDto } from "../entities/History";

export interface HistoryRepository {
    create(data:CreateHistoryDto): Promise<History>;
}