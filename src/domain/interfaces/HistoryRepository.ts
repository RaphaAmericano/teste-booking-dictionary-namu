export interface HistoryRepository {
    create(data:CreateHistoryDto): Promise<History>;
}