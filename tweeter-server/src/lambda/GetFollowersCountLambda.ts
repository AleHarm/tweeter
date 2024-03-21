import { GetFollowersCountRequest } from "tweeter-shared/dist/model/net/Requests/GetFollowersCountRequest";
import { UserService } from "../model/service/UserService";
import { GetNumberResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: GetFollowersCountRequest): Promise<GetNumberResponse> => {

  let response = new GetNumberResponse(...await new UserService().getFollowersCount(event.user, event.authToken));
  return response;
};