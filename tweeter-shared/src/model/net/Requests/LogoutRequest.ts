import { AuthToken } from "../../domain/AuthToken";
import { Request } from "./Request";

export class LogoutRequest implements Request{

  authToken: AuthToken;

  constructor(authToken: AuthToken){

    this.authToken = authToken;
  }
}