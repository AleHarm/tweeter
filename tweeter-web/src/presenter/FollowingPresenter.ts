import { UserItemPresenter } from "./UserItemPresenter";
import { PAGE_SIZE } from "./PagedItemPresenter";
import { AuthToken } from "tweeter-shared/src/model/domain/AuthToken";
import { User } from "tweeter-shared/src/model/domain/User";

export class FollowingPresenter extends UserItemPresenter{
  protected getMoreItems(authToken: AuthToken, displayedUser: User): Promise<[User[], boolean]> {
    return this.service.loadMoreFollowees(
      authToken, 
      displayedUser, 
      PAGE_SIZE, 
      this.lastItem
      );
  }
  protected getItemDescription(): string {
    return "load following items";
  }
}