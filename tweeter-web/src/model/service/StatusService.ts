import { Status } from "tweeter-shared/src/model/domain/Status";
import { ServerFacade } from "../../net/ServerFacade";
import { User, } from "../../../../tweeter-shared/src/model/domain/User";
import { AuthToken } from "../../../../tweeter-shared/src/model/domain/AuthToken";
import { 
  PostStatusRequest,
  LoadStatusRequest
 } from "../../../../tweeter-shared/src/model/net/Request";


export class StatusService{

  server = new ServerFacade();

  public async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>{

    let request = new LoadStatusRequest(authToken, user, pageSize, lastItem);
    let response = await this.server.loadMoreFeedItems(request);

    return response.paginatedStatusItems;
  };

  public async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>{

    let request = new LoadStatusRequest(authToken, user, pageSize, lastItem);
    let response = await this.server.loadMoreStoryItems(request);

    return response.paginatedStatusItems;
  };

  public async postStatus (
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {

    let request = new PostStatusRequest(authToken, newStatus);
    await this.server.postStatus(request);
  };
}