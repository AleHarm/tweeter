import { LoadStatusRequest } from "tweeter-shared/dist/model/net/Request";
import { StatusService } from "../model/service/StatusService";
import { StatusItemsResponse } from "tweeter-shared/dist/model/net/Response";

export const handler = async (event: LoadStatusRequest): Promise<StatusItemsResponse> => {

  let response = new StatusItemsResponse(...await new StatusService().loadMoreStoryItems(event.authToken, event.user, event.pageSize, event.lastItem));
  return response;
};