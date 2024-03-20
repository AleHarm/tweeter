import { Buffer } from "buffer";
import { ServerFacade } from "../../net/ServerFacade";
import { User, } from "../../../../tweeter-shared/src/model/domain/User";
import { AuthToken } from "../../../../tweeter-shared/src/model/domain/AuthToken";
import { FakeData } from "../../../../tweeter-shared/src/util/FakeData";
import { LoginRequest } from "../../../../tweeter-shared/src/model/net/Requests/LoginRequest";
import { LogoutRequest } from "../../../../tweeter-shared/src/model/net/Requests/LogoutRequest";

export class UserService{

  server = new ServerFacade();

  public async getIsFollowerStatus (
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  };

  public async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweesCount(user);
  };

  public async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowersCount(user);
  };

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array
  ): Promise<[User, AuthToken]>{
    // Not neded now, but will be needed when you make the request to the server in milestone 3
    let imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: Replace with the result of calling the server
    let user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  };

  public async getUser (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null>{
    return FakeData.instance.findUserByAlias(alias);
  };

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]>{
    let request = new LoginRequest(alias, password);
    let response = await this.server.login(request)

    return [response.user, response.token];
  };

  public async logout (authToken: AuthToken): Promise<void> {
    let request = new LogoutRequest(authToken);
    await this.server.logout(request);
  };
}