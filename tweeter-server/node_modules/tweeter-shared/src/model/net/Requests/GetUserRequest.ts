import { AuthToken } from "../../domain/AuthToken";
import { Request } from "./Request";

export class GetUserRequest implements Request{

  alias: string;
  authToken: AuthToken;

  constructor(alias: string, authToken: AuthToken){

    this.alias = alias;
    this.authToken = authToken;
  }
}