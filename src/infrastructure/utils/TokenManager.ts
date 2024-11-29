import { JwtPayload, sign, verify } from 'jsonwebtoken'
const SECRET_KEY = process.env.SECRET_KEY || 'secret'

export class TokenManager {
    public static generateToken(payload: any): string{
        return sign(payload, SECRET_KEY, { expiresIn: '1h' })
    }   

    public static verifyToken(token: string): string | JwtPayload {
        return verify(token, SECRET_KEY)
    }
    
}