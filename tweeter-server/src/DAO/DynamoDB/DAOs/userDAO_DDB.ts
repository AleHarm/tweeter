import { User } from "tweeter-shared/src/model/domain/User";
import { userDAO } from "../../Interfaces/userDAO";

export class userDAO_DDB implements userDAO{
  getUser(alias: string): User {
    throw new Error("Method not implemented.");
  }
  putUser(user: User): void {
    throw new Error("Method not implemented.");
  }
}