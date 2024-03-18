import { LoginRequest } from "tweeter-shared"
import { AuthenticateResponse } from "tweeter-shared/dist/model/net/Response";
import { UserService } from "../model/service/UserService";

export const handler = async (event: LoginRequest): Promise<AuthenticateResponse> => {

  let response = new AuthenticateResponse(...await new UserService().login(event.username, event.password));
  return response;
};