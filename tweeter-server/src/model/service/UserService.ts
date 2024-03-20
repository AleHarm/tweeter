import { User, AuthToken, FakeData } from "tweeter-shared";

export class UserService{

  public async login(
    alias: string,
    password: string
  ): Promise<[boolean, User, AuthToken]>{
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("[Bad Request] Invalid alias or password");
    }

    return [true, user, FakeData.instance.authToken];
  };

  public async logout (authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.

    if(authToken === null){

      throw new Error("[Bad Request] Invalid alias or password");
    }

    await new Promise((res) => setTimeout(res, 1000));
  };
}