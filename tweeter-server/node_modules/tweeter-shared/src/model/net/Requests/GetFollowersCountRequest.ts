import { AuthToken } from "../../domain/AuthToken";
import { User } from "../../domain/User";
import { Request } from "./Request";

export class GetFollowersCountRequest implements Request{

  authToken: AuthToken;
  user: User;

  constructor(authToken: AuthToken, user: User){

    this.authToken = authToken;
    this.user = user;
  }
}