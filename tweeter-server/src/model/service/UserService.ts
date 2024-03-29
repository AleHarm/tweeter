import { User, AuthToken, FakeData } from "tweeter-shared";

export class UserService{

  public async login(
    alias: string,
    password: string
  ): Promise<[boolean, User, AuthToken]>{
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("[BadRequest] Invalid alias or password");
    }

    return [true, user, FakeData.instance.authToken];
  };

  public async logout (authToken: AuthToken): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.

    if(authToken === null){

      throw new Error("[BadRequest] Invalid alias or password");
    }

    await new Promise((res) => setTimeout(res, 1000));
  };

  public async register (
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    imageStringBase64: string
  ): Promise<[boolean, User, AuthToken]>{
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("[BadRequest] Invalid registration");
    }

    return [true, user, FakeData.instance.authToken];
  }

  public async getUser(
    authToken: AuthToken,
    alias: string
  ): Promise<[boolean, User]>{
    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.findUserByAlias(alias);

    if (user === null) {
      throw new Error("[BadRequest] Invalid alias or authToken");
    }

    return [true, user];
  };

  public async getFollowersCount(
    user: User,
    authToken: AuthToken
  ): Promise<[boolean, number]>{
     // TODO: Replace with the result of calling server
     let value: number = await FakeData.instance.getFollowersCount(user);

    if (value === null) {
      throw new Error("[BadRequest] Invalid user");
    }

    return [true, value];
  };

  public async getFolloweesCount(
    user: User,
    authToken: AuthToken
  ): Promise<[boolean, number]>{
     // TODO: Replace with the result of calling server
    let value = await FakeData.instance.getFolloweesCount(user);

    if (value === null) {
      throw new Error("[BadRequest] Invalid user");
    }

    return [true, value];
  };

  public async getIsFollowerStatus(
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<[boolean, boolean]>{
     // TODO: Replace with the result of calling server
    let value = await FakeData.instance.isFollower();

    if (value === null) {
      throw new Error("[BadRequest] Invalid user or authToken");
    }

    return [true, value];
  };
}