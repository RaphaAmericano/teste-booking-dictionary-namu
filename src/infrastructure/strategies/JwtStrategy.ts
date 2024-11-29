import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"

export class JwtStrategyService {
  public static getStrategy(): JwtStrategy {
    return new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY || "secret",
      },
      (payload, done) => {
        done(null, payload)
      }
    )
  }
}