import { Status } from "tweeter-shared/src/model/domain/Status";
import { FakeData } from "tweeter-shared/src/util/FakeData";
import { ServerFacade } from "../../net/ServerFacade";
import { User, } from "../../../../tweeter-shared/src/model/domain/User";
import { AuthToken } from "../../../../tweeter-shared/src/model/domain/AuthToken";
import { PostStatusRequest } from "../../../../tweeter-shared/src/model/net/Request";


export class StatusService{

  server = new ServerFacade();

  public async loadMoreFeedItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };

  public async loadMoreStoryItems(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };

  public async postStatus (
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> {

    let request = new PostStatusRequest(authToken, newStatus);
    await this.server.postStatus(request);
  };
}