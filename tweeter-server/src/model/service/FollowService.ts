import { User, AuthToken, FakeData } from "tweeter-shared";

export class FollowService{

  public async loadMoreFollowers (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: User | null
  ): Promise<[boolean, [User[], boolean]]>{
    // TODO: Replace with the result of calling server
    const paginatedUserItems = FakeData.instance.getPageOfUsers(lastItem, pageSize, user);

    if (paginatedUserItems === null) {
      throw new Error("[BadRequest] Invalid user or authToken");
    }

    return [true, paginatedUserItems];
  }
}