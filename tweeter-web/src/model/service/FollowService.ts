import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { User } from "tweeter-shared/src/model/domain/User";
import { FakeData } from "tweeter-shared/src/util/FakeData";
import { ServerFacade } from "../../net/ServerFacade";
import { 
  LoadUserRequest
 } from "../../../../tweeter-shared/src/model/net/Request";

export class FollowService{
  
  server = new ServerFacade();

  public async loadMoreFollowers(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]>{

    let request = new LoadUserRequest(authToken, user, pageSize, lastItem);
    let response = await this.server.loadMoreFollowers(request);

    return response.paginatedUserItems;
  };

  public async loadMoreFollowees(
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(lastItem, pageSize, user);
  };
}
