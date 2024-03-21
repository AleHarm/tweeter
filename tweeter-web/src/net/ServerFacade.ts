import { ClientCommunicator } from "./ClientCommunicator";
import { 
  LoginRequest, 
  LogoutRequest, 
  RegisterRequest,
  GetUserRequest,
  GetFollowersCountRequest,
  GetFolloweesCountRequest,
  GetIsFollowerStatusRequest,
  PostStatusRequest } from "tweeter-shared/src/model/net/Request";
import { 
  AuthenticateResponse,
  GetNumberResponse,
  GetUserResponse,
  GetBooleanResponse } from "tweeter-shared/src/model/net/Response";


export class ServerFacade {

  private SERVER_URL = "https://5beydzyirf.execute-api.us-east-2.amazonaws.com/dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async logout(request: LogoutRequest): Promise<void> {
    const endpoint = "/logout";
    await this.clientCommunicator.doPost<LogoutRequest>(request, endpoint);
  }

  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    const endpoint = "/register";
    const response: JSON = await this.clientCommunicator.doPost<RegisterRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async getUser(request: GetUserRequest): Promise<GetUserResponse> {
    const endpoint = "/getUser";
    const response: JSON = await this.clientCommunicator.doPost<GetUserRequest>(request, endpoint);

    return GetUserResponse.fromJson(response);
  }

  async getFollowersCount(request: GetFollowersCountRequest): Promise<GetNumberResponse> {
    const endpoint = "/getFollowersCount";
    const response: JSON = await this.clientCommunicator.doPost<GetFollowersCountRequest>(request, endpoint);

    return GetNumberResponse.fromJson(response);
  }

  async getFolloweesCount(request: GetFolloweesCountRequest): Promise<GetNumberResponse> {
    const endpoint = "/getFolloweesCount";
    const response: JSON = await this.clientCommunicator.doPost<GetFolloweesCountRequest>(request, endpoint);

    return GetNumberResponse.fromJson(response);
  }

  async getIsFollowerStatus(request: GetIsFollowerStatusRequest): Promise<GetBooleanResponse> {
    const endpoint = "/getIsFollowerStatus";
    const response: JSON = await this.clientCommunicator.doPost<GetIsFollowerStatusRequest>(request, endpoint);

    return GetBooleanResponse.fromJson(response);
  }

  async postStatus(request: PostStatusRequest): Promise<void> {
    const endpoint = "/postStatus";
    await this.clientCommunicator.doPost<PostStatusRequest>(request, endpoint);
  }
}