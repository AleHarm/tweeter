import { StatusItemPresenter } from "./StatusItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { User } from "tweeter-shared/src/model/domain/User";
import { Status } from "tweeter-shared/src/model/domain/Status";

export class FeedPresenter extends StatusItemPresenter{
  protected getMoreItems(authToken: AuthToken, displayedUser: User): Promise<[Status[], boolean]> {
    return this.service.loadMoreFeedItems(
      authToken, 
      displayedUser, 
      PAGE_SIZE, 
      this.lastItem
      );
  }
  protected getItemDescription(): string {
    return "load feed items";
  }
}

