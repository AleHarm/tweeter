import { LoginRequest } from "tweeter-shared/dist/model/net/Requests/LoginRequest";
import { UserService } from "../model/service/UserService";
import { AuthenticateResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {

  let response = new AuthenticateResponse(...await new UserService().login(event.username, event.password));
  return response;
};