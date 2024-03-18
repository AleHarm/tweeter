import { User, AuthToken, FakeData } from "tweeter-shared";

export class UserService{

  public async login(
    alias: string,
    password: string
  ): Promise<[boolean, User, AuthToken]>{
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [true, user, FakeData.instance.authToken];
  };
}