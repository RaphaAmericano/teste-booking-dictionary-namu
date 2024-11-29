import passport, { Strategy } from "passport"
export class PassportConfig {
    public static configure(name: string, strategy: Strategy): void{
        passport.use(name, strategy)
    }
}