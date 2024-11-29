export interface AuthId {
    id?: string
}

export interface Auth extends AuthId {
    password: string
    created_at?: Date
}

export interface CreateAuthDto extends Pick<Auth, 'password' | 'id' >{}

export interface CreateAuthWithUserDto extends Pick<Auth, 'password' > {
    name: string
}