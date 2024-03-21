import { RegisterRequest } from "tweeter-shared/dist/model/net/Request";
import { UserService } from "../model/service/UserService";
import { AuthenticateResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: RegisterRequest): Promise<AuthenticateResponse> => {

  let response = new AuthenticateResponse(...await new UserService().register(event.firstName, event.lastName, event.alias, event.password, event.imageStringBase64));
  return response;
};