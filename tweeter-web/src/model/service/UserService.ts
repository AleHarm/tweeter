import { Buffer } from "buffer";
import { ServerFacade } from "../../net/ServerFacade";
import { User, } from "../../../../tweeter-shared/src/model/domain/User";
import { AuthToken } from "../../../../tweeter-shared/src/model/domain/AuthToken";
import { 
  LoginRequest, 
  LogoutRequest, 
  RegisterRequest, 
  GetUserRequest, 
  GetFollowersCountRequest,
  GetFolloweesCountRequest,
  GetIsFollowerStatusRequest } from "../../../../tweeter-shared/src/model/net/Request";


export class UserService{

  server = new ServerFacade();

  public async getIsFollowerStatus (
    authToken: AuthToken,
    user: User,
    selectedUser: User
  ): Promise<boolean>{

    let request = new GetIsFollowerStatusRequest(authToken, user, selectedUser);
    let response = await this.server.getIsFollowerStatus(request);

    return response.value;
  };

  public async getFolloweesCount(
    authToken: AuthToken,
    user: User
  ): Promise<number>{

    let request = new GetFolloweesCountRequest(authToken, user);
    let response = await this.server.getFolloweesCount(request);

    return response.value;
  };

  public async getFollowersCount(
    authToken: AuthToken,
    user: User
  ): Promise<number>{

    let request = new GetFollowersCountRequest(authToken, user);
    let response = await this.server.getFollowersCount(request);

    return response.value;
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

    let request = new RegisterRequest(firstName, lastName, alias, password, imageStringBase64);
    let response = await this.server.register(request);

    return [response.user, response.token];
  };

  public async getUser (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null>{

    let request = new GetUserRequest(alias, authToken);
    let response = await this.server.getUser(request);

    return response.user;
  };

  public async login(
    alias: string,
    password: string
  ): Promise<[User, AuthToken]>{
    let request = new LoginRequest(alias, password);
    let response = await this.server.login(request);

    return [response.user, response.token];
  };

  public async logout (authToken: AuthToken): Promise<void> {
    let request = new LogoutRequest(authToken);
    await this.server.logout(request);
  };
}