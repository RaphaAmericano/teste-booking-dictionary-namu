export interface HistoryId {
    id: string;
}

export interface History extends HistoryId {
    word_id: string;
    user_id: string;
    created_at: Date;
}

export interface CreateHistoryDto extends Omit<History, "id" | "created_at"> {}