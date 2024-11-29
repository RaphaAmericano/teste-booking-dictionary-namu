export interface UserId {
    id?: string
}
export interface User extends UserId {
    name: string
}

export interface CreateUserDto extends User {
    auth_id: string
}