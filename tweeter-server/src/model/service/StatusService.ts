import { User, AuthToken, FakeData, Status } from "tweeter-shared";

export class StatusService{

  public async postStatus(authToken: AuthToken, newStatus: Status): Promise<void> {
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.

    if(authToken === null){

      throw new Error("[BadRequest] Invalid authtoken");
    }

    await new Promise((f) => setTimeout(f, 2000));
    // TODO: Call the server to post the status
  };

  public async loadMoreFeedItems (
    authToken: AuthToken,
    user: User,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[boolean, [Status[], boolean]]>{
    // TODO: Replace with the result of calling server
    const paginatedStatusItems = FakeData.instance.getPageOfStatuses(lastItem, pageSize);

    if (paginatedStatusItems === null) {
      throw new Error("[BadRequest] Invalid user or authToken");
    }

    return [true, paginatedStatusItems];
  }
}