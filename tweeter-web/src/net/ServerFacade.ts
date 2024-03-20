import { ClientCommunicator } from "./ClientCommunicator";
import { LoginRequest } from "tweeter-shared/src/model/net/Requests/LoginRequest";
import { LogoutRequest } from "tweeter-shared/src/model/net/Requests/LogoutRequest";
import { AuthenticateResponse } from "tweeter-shared/src/model/net/Response";

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
}