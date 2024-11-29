import { PromiseHandle } from "../../shared/utils/PromiseHandle";
import { Strategy as LocalStrategy } from "passport-local";
import { AuthUtils } from "../utils/AuthUtils";
export class LocalStrategyService {
  constructor(private readonly findUserFunction: (value: string) => any) {}
  public getStategy(): any {
    return new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        const { data, error } = await PromiseHandle.wrapPromise<any>(
          this.findUserFunction(email)
        );
        // Validar o password
        if (!data || !AuthUtils.validatePassword(data.password, password) ||  error) {
          return done(null, false, { message: "Email ou senha incorretos" });
        }
        return done(null, data);
      }
    );
  }
}
