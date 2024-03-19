import { ClientCommunicator } from "./ClientCommunicator";
import { LoginRequest } from "tweeter-shared/src/model/net/Requests/LoginRequest";
import { AuthenticateResponse } from "tweeter-shared/src/model/net/Response";

export class ServerFacade {

  private SERVER_URL = "TODO: Set this value.";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/service/login";
    const response: JSON = await this.clientCommunicator.doPost<LoginRequest>(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }
}