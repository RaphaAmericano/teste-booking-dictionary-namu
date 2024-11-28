export interface AuthId {
    id?: string
}

export interface Auth extends AuthId {
    password: string
    createdAt: Date
}
