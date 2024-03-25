import { GetUserRequest } from "tweeter-shared/dist/model/net/Request";
import { UserService } from "../model/service/UserService";
import { GetUserResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: GetUserRequest): Promise<GetUserResponse> => {

  let response = new GetUserResponse(...await new UserService().getUser(event.authToken, event.alias));
  return response;
};