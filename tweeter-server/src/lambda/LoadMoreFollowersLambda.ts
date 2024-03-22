import { LoadUserRequest } from "tweeter-shared/dist/model/net/Request";
import { FollowService } from "../model/service/FollowService";
import { UserItemsResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoadUserRequest): Promise<UserItemsResponse> => {

  let response = new UserItemsResponse(...await new FollowService().loadMoreFollowers(event.authToken, event.user, event.pageSize, event.lastItem));
  return response;
};