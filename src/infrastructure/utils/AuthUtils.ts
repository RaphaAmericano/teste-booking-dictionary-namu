export class AuthUtils {
    public static validatePassword(password: string, password_to_check: string): boolean {
        return password === password_to_check
    }
}