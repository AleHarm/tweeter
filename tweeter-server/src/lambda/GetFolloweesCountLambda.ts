import { GetFolloweesCountRequest } from "tweeter-shared/dist/model/net/Request";
import { UserService } from "../model/service/UserService";
import { GetNumberResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: GetFolloweesCountRequest): Promise<GetNumberResponse> => {

  let response = new GetNumberResponse(...await new UserService().getFolloweesCount(event.user, event.authToken));
  return response;
};