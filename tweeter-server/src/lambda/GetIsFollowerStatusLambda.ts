import { GetIsFollowerStatusRequest } from "tweeter-shared/dist/model/net/Request";
import { UserService } from "../model/service/UserService";
import { GetBooleanResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: GetIsFollowerStatusRequest): Promise<GetBooleanResponse> => {

  let response = new GetBooleanResponse(...await new UserService().getIsFollowerStatus(event.authToken, event.user, event.selectedUser));
  return response;
};