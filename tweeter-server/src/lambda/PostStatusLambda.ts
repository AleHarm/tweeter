import { PostStatusRequest } from "tweeter-shared/dist/model/net/Request";
import { StatusService } from "../model/service/StatusService";

export const handler = (event: PostStatusRequest): Promise<void> => {

  return new StatusService().postStatus(event.authToken, event.newStatus);
};