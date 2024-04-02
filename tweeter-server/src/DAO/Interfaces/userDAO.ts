import { User } from "tweeter-shared/src/model/domain/User";

export interface userDAO{

  getUser(alias: string): User;

  putUser(user: User): void;
};